import { execSync } from 'child_process';
import { pkgDetails } from './util-packages.mjs';
import path from 'path';

Object.entries(pkgDetails).forEach(([pkgPath, pkg]) => {
    const result = execSync(`git diff --name-only ${pkgPath}`).toString().split('\n');

    console.log(`All changed for ${pkg.name}:`, result);

    const excludedFileNames = ['README.md', 'jsr.json', 'package.json'].map(file => file.toLowerCase());
    //keep only the files that we want to watch
    const changedFiles = result.filter(filePath => {
        filePath = filePath.toLowerCase();
        if (filePath.length === 0) {
            return false;
        }
        if (excludedFileNames.includes(filePath)) {
            return false;
        }
        if (excludedFileNames.some(path => path.endsWith(filePath))) {
            return false;
        }
        return true;
    });
    if (changedFiles.length > 0) {
        console.log(`Package ${pkg.name} has changed files:`);
        console.log(changedFiles);
        execSync(`cd ${pkgPath}`);
        const bumpResult = execSync(`npm version patch -m "Bump package patch version for ${pkg.name}"`);
        console.log(bumpResult);
    } else {
        console.log(`Package ${pkg.name} has no changes since the last commit.`);
    }
});