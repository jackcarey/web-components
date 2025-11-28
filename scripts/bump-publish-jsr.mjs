import { execSync } from 'child_process';
import { pkgDetails, logExecSync, updatePkgDetails } from './util-packages.mjs';
import path from 'path';
import fs from 'fs';

const jsrScope = 'web-components';
const branch = logExecSync('git rev-parse --abbrev-ref HEAD').toString().trim();
const lastCommitMsg = logExecSync('git log -1 --pretty=%B').toString().trim();
const isMain = branch === 'main';
const isGHAction = lastCommitMsg.startsWith('[GH Actions]');

const updateJSR = (dir, pkgJson) => {
    const { name, version, entry = "./index.ts", license } = pkgJson;
    const jsrPath = path.join(dir, 'jsr.json');
    const existingContent = fs.existsSync(jsrPath) ? fs.readFileSync(jsrPath, 'utf8') : null;

    if (!version) {
        throw new Error(`Version is required to tag package '${name}'.`);
    }
    if (!entry) {
        throw new Error(`Entry is required to publish package '${name}'.`);
    }

    const jsrJson = {
        "name": `@${jsrScope}/${name}`,
        "version": version,
        "exports": entry,
    };
    if (license) jsrJson.license = license;

    const newContent = JSON.stringify(jsrJson, null, 2);
    if (existingContent !== newContent) {
        fs.writeFileSync(jsrPath, newContent);
        console.log('JSR object updated at ', jsrPath);
    } else {
        console.log('No changes to JSR object at', jsrPath);
    }
};

/**
 * Perform a dry run publish for a given package.
 * @param {string} name - The name of the package.
 * @param {string} dir - The directory of the package.
 * @returns {Buffer} - The output of the dry run command.
 */
const dryRunPkg = (name, dir) => {
    updateJSR(dir, pkgDetails[dir]);
    const dryRunCmd = `cd "${dir}"\nnpx jsr publish --allow-dirty --dry-run`;
    console.log(`Dry run for package '${name}'`);
    return logExecSync(dryRunCmd);
};

/**
 * Publish a given package if on the main branch.
 * @param {string} name 
 * @param {string} dir 
 * @returns 
 */
const publishPkg = (dir, pkgJson) => {
    const { name, version } = pkgJson;
    if (!isMain) {
        console.log(`Not on main branch, skipping publish for package '${name}'.`);
        return;
    }


    const existingPkgTags = logExecSync(`git tag --list "${name}@*"`).toString().trim().split('\n').filter(t => t.startsWith(`${name}@`));
    const pkgTag = `${name}@${version}`;
    const alreadyExists = existingPkgTags.includes(pkgTag);
    if (alreadyExists) {
        console.log(`Tag '${pkgTag}' already exists, skipping tag creation.`);
        return "";
    }
    updateJSR(dir, pkgJson);
    logExecSync(`git config --global user.email "actions@github.com"`);
    logExecSync(`git config --global user.name "[GitHub Actions]"`);
    logExecSync(`git tag -a ${pkgTag} -m "${pkgTag}"`);
    logExecSync(`git push origin tag ${pkgTag}`);

    console.log(`Publishing package '${name}'...`);
    const publishCmd = `cd "${dir}"\nnpx jsr publish --allow-dirty`;
    const publishResult = logExecSync(publishCmd);
    return publishResult;
};

const getLatestPkgTag = (name) => {
    const pkgTags = logExecSync(`git tag --list "${name}@*"`).toString().trim().split('\n').filter(t => t.startsWith(`${name}@`));
    const latestTag = pkgTags.sort((a, b) => {
        const [AMajor, AMinor, APatch] = a.split('@')[1]?.split(".");
        const [BMajor, BMinor, BPatch] = b.split('@')[1]?.split(".");
        return (AMajor - BMajor) || (AMinor - BMinor) || (APatch - BPatch);
    }).pop();
    return latestTag;
}

const hasPkgChanged = (name, dir) => {
    const relativeDir = path.relative(process.cwd(), dir).replaceAll("\\", "/");
    if (!relativeDir.startsWith('packages/')) {
        throw new Error(`Directory not within the 'packages/' directory: ${dir}`);
    }
    const latestTag = getLatestPkgTag(name);
    const gitDiffCmd = latestTag ? `git diff --name-only ${latestTag} HEAD -- "${dir}"` : `git diff --name-only HEAD -- "${dir}"`;
    const excludedFileNames = ['jsr.json', 'package-lock.json', 'package.json'].map(file => file.toLowerCase());
    // Get all changed files in the directory (excluding specified files)
    const changedFiles = logExecSync(gitDiffCmd).toString()
        .split('\n')
        .map(f => f.trim())
        .filter((filePath) => {
            const pathLower = filePath?.toLowerCase();
            if (!pathLower) {
                return false;
            }
            const isPathExcludedCompletely = excludedFileNames.includes(pathLower);
            const isFileNameExcluded = excludedFileNames.some(p => pathLower.endsWith(p));
            return !isPathExcludedCompletely && !isFileNameExcluded;
        });
    const hasChanged = changedFiles.length > 0;
    if (hasChanged) {
        console.log(`Package '${name}' has changed files:\n- ${changedFiles.join("\n- ")}`);
    } else {
        console.log(`Package '${name}' has no relevant changes.`);
    }
    return hasChanged;
};

const checkBumpPkg = (name, dir) => {
    console.log(`Bumping patch version for package: ${name}`);
    process.chdir(dir);
    const bumpResult = execSync(`npm version patch -m "Bump package patch version for ${name}" --no-git-tag-version`);
    console.log(`Bumped ${name} to ${bumpResult}`);
}

if (isMain) {
    console.log(`Branch is ${branch}, isGHAction: ${isGHAction}`);
    //packages are filtered and mapped to include change status
    const checkPkgs = Object.entries(pkgDetails).filter(([_, pkg]) => {
        const isAutoLoader = pkg.name === 'autoloader';
        if (isGHAction) {
            return !pkg.private && isAutoLoader;
        } else {
            return !pkg.private;
        }
    }).map(([dir, pkg]) => {
        const changed = hasPkgChanged(pkg.name, dir);
        const latestTag = getLatestPkgTag(pkg.name);
        const shouldBumpAndPublish = !latestTag || changed;
        return ({
            dir,
            pkg,
            changed,
            latestTag,
            shouldBumpAndPublish
        });
    });

    const ignoredPkgs = checkPkgs.filter(p => !p.shouldBumpAndPublish);
    if (ignoredPkgs.length === 0) {
        console.log('All packages have changes or no tag and will be processed.');
    } else {
        console.log(`Checked ${checkPkgs.length} packages for changes. These will be ignored:`);
    }
    ignoredPkgs.forEach(({ pkg, latestTag }) => {
        console.log(`- ${pkg.name} (latest tag: ${latestTag || 'none'})`);
    });
    console.log('-'.repeat(80));
    const changedPkgs = checkPkgs.filter(({ shouldBumpAndPublish }) => shouldBumpAndPublish);
    if (changedPkgs.length === 0) {
        console.log('No packages have changed, skipping bump and publish.');
        process.exit(0);
    } else {
        changedPkgs.forEach(({ dir, pkg }) => {
            checkBumpPkg(pkg.name, dir);
        });
        console.log('-'.repeat(80));
        console.log('Dry running publishing...');
        changedPkgs.forEach(({ dir, pkg }) => {
            dryRunPkg(pkg.name, dir);
        });
        console.log('Dry runs complete!');
        console.log('-'.repeat(80));
        console.log('Publishing packages...');
        await updatePkgDetails().then(() => {
            changedPkgs.forEach(({ dir }) => {
                publishPkg(dir, pkgDetails[dir]);
            });
            console.log('Publish complete!');
            console.log('-'.repeat(80));
        });
    }
} else {
    console.log(`Branch is ${branch}, dry run publishing packages (only).`);
    Object.entries(pkgDetails).forEach(({ dir, pkg }) => {
        dryRunPkg(pkg.name, dir);
    });
    console.log('Dry runs complete!');
}