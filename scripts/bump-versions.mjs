import { execSync } from 'child_process';
import { pkgDetails, repoRootDir } from './util-packages.mjs';
import path from "path";
import fs from 'fs';
//this script could do with checking against the commit of the last version bump for each package
// but for now it will do a simple check against the last commit
// this should be changed in the future

const excludedFileNames = ['README.md', 'jsr.json', 'package.json'].map(file => file.toLowerCase());
const lastPackageChangesCommit = fs.readFileSync(path.join(repoRootDir, '/.storybook/last-commit-hash.txt'), 'utf8').trim();
console.log(`Looking for changes since commit: ${lastPackageChangesCommit}`);
const allChanges = execSync(`git diff ${lastPackageChangesCommit} HEAD --name-only`).toString().replaceAll("\\", "/").split('\n');
const relevantChanges = allChanges.filter(filePath => {
    const pathLower = filePath.toLowerCase();

    const isWithinPkg = pathLower.startsWith('packages/');
    const isExcludedCompletely = excludedFileNames.includes(pathLower);
    const isDocumentExcluded = excludedFileNames.some(p => p.endsWith(pathLower));

    return isWithinPkg && !isExcludedCompletely && !isDocumentExcluded;
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