import fs from 'fs';
import path from 'path';
import PackageJson from '@npmcli/package-json';
import { execSync } from 'child_process';

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

//sanitises the package names and sorts them alphabetically
const pkgDetails = Object.fromEntries(Object.entries(unsortedPkgDetails).sort(([dirA, pkgA], [dirB, pkgB]) => {
    const nameA = String(pkgA?.name ?? '').replaceAll('-', '');
    const nameB = String(pkgB?.name ?? '').replaceAll('-', '');
    return nameA.localeCompare(nameB);
}));

const installDepsAtRoot = () => Object.values(pkgDetails).forEach(pkgJson => {
    const peerDeps = pkgJson.peerDependencies;
    const devDeps = pkgJson.devDependencies;
    const deps = pkgJson.dependencies;
    const allDeps = { ...peerDeps, ...devDeps, ...deps };
    const installString = Object.entries(allDeps).map(([dep, version]) => `${dep}@${version}`).join(' ');
    execSync(`npm install --prefix ${repoRootDir} ${installString}`, (err, stdout, stderr) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log(stdout);
    });
});

export { repoRootDir, pkgRootDir, pkgDetails, count, installDepsAtRoot };
export default unsortedPkgDetails;