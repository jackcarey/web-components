import { execSync } from 'child_process';
import { lastCommitHashFilePath, pkgDetails } from './util-packages.mjs';
import fs from 'fs';
//this script could do with checking against the commit of the last version bump for each package
// but for now it will do a simple check against the last commit
// this should be changed in the future

const excludedFileNames = ['README.md', 'jsr.json', 'package-lock.json', 'package.json'].map(file => file.toLowerCase());
const lastPackageChangesCommit = fs.readFileSync(lastCommitHashFilePath, 'utf8').trim();
const lastCommitMsg = execSync(`git log -1 --pretty=%B ${lastPackageChangesCommit}`).toString().trim();
console.log(`Looking for changes since commit: ${lastPackageChangesCommit} - "${lastCommitMsg}"`);
const allChanges = execSync(`git diff ${lastPackageChangesCommit} HEAD --name-only`).toString().replaceAll("\\", "/").split('\n');

const relevantChanges = allChanges.filter(filePath => {
    const pathLower = filePath?.toLowerCase();

    if (!pathLower) {
        return false;
    }

    const isWithinPkg = pathLower.startsWith('packages/');
    const isPathExcludedCompletely = excludedFileNames.includes(pathLower);
    const isFileNameExcluded = excludedFileNames.some(p => pathLower.endsWith(p));

    return isWithinPkg && !isPathExcludedCompletely && !isFileNameExcluded;
});

const changedPackages = Array.from(new Set(relevantChanges.map(filePath => {
    return filePath.split('/')[1];
})));
console.log(`Changed packages:\n\n- ${changedPackages.join("\n- ")}\n`);

Object.entries(pkgDetails).filter(([_, pkg]) => {
    return changedPackages.includes(pkg.name);
}).forEach(([pkgPath, pkg]) => {
    try {
        process.chdir(pkgPath);
        const bumpResult = execSync(`npm version patch -m "Bump package patch version for ${pkg.name}" --no-git-tag-version`);
        console.log(bumpResult.toString());
    } catch (e) {
        console.error(`Failed to bump version for package: ${pkg.name}`);
        console.error(e);
    }
});