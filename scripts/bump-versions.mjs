import { execSync } from 'child_process';
import { pkgDetails, repoRootDir } from './util-packages.mjs';
import path from "path";
import fs from 'fs';
//this script could do with checking against the commit of the last version bump for each package
// but for now it will do a simple check against the last commit
// thi should be changed in the future

const excludedFileNames = ['README.md', 'jsr.json', 'package.json'].map(file => file.toLowerCase());
const lastPackageChangesCommit = fs.readSync(path.join(repoRootDir, '/.storybook/last-commit-hash.txt'), 'utf8').trim();
console.log(`Looking for changes since commit: ${lastPackageChangesCommit}`);
const allChanges = execSync(`git diff ${lastPackageChangesCommit} HEAD --name-only`).toString().replaceAll("\\", "/").split('\n');
const relevantChanges = allChanges.filter(filePath => {
    const pathLower = filePath.toLowerCase();

    const isWithinPkg = pathLower.startsWith('packages/');
    const isExcludedCompletely = excludedFileNames.includes(pathLower);
    const isDocumentExcluded = excludedFileNames.some(p => p.endsWith(pathLower));
    const isExcluded = !isWithinPkg || isExcludedCompletely || isDocumentExcluded;
    
    return !isExcluded;
});
console.log(`Within packages/, excluding: ${excludedFileNames.join(", ")}`);
console.log(`All relevant changes across all packages:\n\n- ${allChanges.join("\n- ")}\n`);

Object.entries(pkgDetails).forEach(([pkgPath, pkg]) => {
    const relPath = path.relative(repoRootDir, pkgPath).replaceAll("\\", "/");

    //keep only the files for this package
    const changedFiles = relevantChanges.filter(x => x.startsWith(relPath));
    if (changedFiles.length > 0) {
        console.log(`Package '${pkg.name}' has changed files:`);
        console.log("-", changedFiles.join("\n"));
        execSync(`cd ${pkgPath}`);
        const bumpResult = execSync(`npm version patch -m "Bump package patch version for ${pkg.name}"`);
        console.log(bumpResult);
    } else {
        console.log(`Package '${pkg.name}' has no changes since the last commit.`);
    }
});