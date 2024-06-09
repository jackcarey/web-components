import fs from 'fs';
import path from 'path';
import PackageJson from '@npmcli/package-json';

// Get the root directory of the repository
const repoRootDir = process.cwd();
const pkgRootDir = path.join(repoRootDir, '/packages');

// Get a list of all directories at the root level that contain a package.json file
const packageDirectories = fs.readdirSync(pkgRootDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(directory => path.join(pkgRootDir, directory.name))
    .filter(directory => fs.existsSync(path.join(directory, 'package.json')));


// Read the package.json files and extract the details
const unsortedPkgDetails = {};
let count = 0;
await Promise.all(packageDirectories.map(async (dir) => {
    return PackageJson.load(dir).then(({ content }) => {
        unsortedPkgDetails[dir] = content;
        count += 1;
    });
}));

const pkgDetails = Object.fromEntries(Object.entries(unsortedPkgDetails).sort(([dirA, pkgA], [dirB, pkgB]) => {
    const nameA = String(pkgA?.name ?? '').replaceAll('-', '');
    const nameB = String(pkgB?.name ?? '').replaceAll('-', '');
    return nameA.localeCompare(nameB);
}));

export { repoRootDir, pkgRootDir, pkgDetails, count };
export default unsortedPkgDetails;