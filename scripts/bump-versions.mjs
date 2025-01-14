import { execSync } from 'child_process';
import { pkgDetails, repoRootDir } from './util-packages.mjs';
import path from "path";

const excludedFileNames = ['README.md', 'jsr.json', 'package.json'].map(file => file.toLowerCase());
const allChanges = execSync(`git diff --name-only HEAD~1`).toString().replaceAll("\\", "/").split('\n').filter(filePath => {
    const pathLower = filePath.toLowerCase();
    if (!pathLower.length) return false;
    const isWithinPkg = pathLower.startsWith('package');
    if (!isWithinPkg) return false;
    const isExcludedCompletely = excludedFileNames.includes(pathLower);
    if (isExcludedCompletely) return false;
    const isDocumentExcluded = excludedFileNames.some(p => p.endsWith(pathLower));
    if (isDocumentExcluded) {
        return pathLength && false;
    }
    return true;
});
console.log(`Within packages/, excluding: ${excludedFileNames.join(", ")}`);
console.log(`All relevant changes across all packages:\n\n- ${allChanges.join("\n- ")}\n`);

Object.entries(pkgDetails).forEach(([pkgPath, pkg]) => {
    const relPath = path.relative(repoRootDir, pkgPath).replaceAll("\\", "/");

    //keep only the files for this package
    const changedFiles = allChanges.filter(x => x.startsWith(relPath));
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