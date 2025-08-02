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
        if (content && content?.private !== "true") {
            unsortedPkgDetails[dir] = content;
            count += 1;
        }
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
    const stdBuffer = execSync(`npm install --prefix ${repoRootDir} ${installString}`);
    console.log(stdBuffer.toString());
});

const getSbLink = (name) => `https://jackcarey.co.uk/web-components/docs/?path=/docs/${!name?.length ? '' : name.includes('-') ? "components" : "utilities"}-${name}`;

const getBadges = (name, scope = 'web-components') => {
    const jsrBadgeUrl = `https://jsr.io/badges/@${scope}/${name}`;
    const jsrVersionBadgeMd = `![${name} version on JSR](${jsrBadgeUrl})`;
    const jsrLinkUrl = `https://jsr.io/@${scope}/${name}`;
    const jsrVersionMd = `[${jsrVersionBadgeMd}](${jsrLinkUrl}/versions)`;
    const jsrScoreUrl = `${jsrBadgeUrl}/score`;
    const jsrScoreMd = `[![JSR score](${jsrScoreUrl})](${jsrLinkUrl}/score)`;
    const sbBadge = `[![${name} ${name.includes("-") ? "component" : "utility"} on Storybook](https://cdn.jsdelivr.net/gh/storybookjs/brand@main/badge/badge-storybook.svg)](${getSbLink(name)})`;
    return `${sbBadge} ${jsrVersionMd} ${jsrScoreMd}`;
};

const logExecSync = (command) => {
    try {
        const buffer = execSync(command);
        if (buffer.length > 0) {
            console.log(buffer.toString());
        }
        return buffer;
    } catch (e) {
        const msg = e?.stdout ?? e?.stderr ?? e.message;
        console.error(msg, e);
        throw e;
    }
};

const lastCommitHashFilePath = path.join(repoRootDir, '/.storybook/last-commit-hash.txt');

export { repoRootDir, pkgRootDir, pkgDetails, count, installDepsAtRoot, getBadges, logExecSync, lastCommitHashFilePath };
export default unsortedPkgDetails;