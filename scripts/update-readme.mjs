import fs from 'fs';
import os from 'os';
import path from 'path';
import PackageJson from '@npmcli/package-json';

// Get the root directory of the repository
const repoRootDir = process.cwd();
const pkgRootDir = path.join(repoRootDir, '/packages');

console.log('compiling packages for readme from:', repoRootDir);

// Get a list of all directories at the root level that contain a package.json file
const packageDirectories = fs.readdirSync(pkgRootDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(directory => path.join(pkgRootDir, directory.name))
    .filter(directory => fs.existsSync(path.join(directory, 'package.json')));


// Read the package.json files and extract the details
const pkgDetails = {};
let count = 0;
await Promise.all(packageDirectories.map(async (dir) => {
    return PackageJson.load(dir).then(({ content }) => {
        pkgDetails[dir] = content;
        count += 1;
    });
}));

// Generate the markdown content
const mdHeader = `# web-components\n\nThis repository contains a collection of ${count} web components for various purposes. Each component is published as a separate package with their own readme.\n\n---\n\n`;
const relativeLink = (dir) => "/" + path.relative(repoRootDir, dir);
const pkgToMdRow = ([dir, pkgJson]) => {
    const name = pkgJson?.name ?? '-';
    const srcLink = `[${name}](${relativeLink(dir)})`;
    const description = pkgJson?.description ?? '-';
    const version = pkgJson?.version ?? '-';
    const jsrScope = 'web-components';
    const jsrLink = `[![$[name}]](https://jsr.io/badges/@${jsrScope}/${name})](https://jsr.io/@${jsrScope}/${name})`;
    return `| [${name}](${srcLink}) | ${description} | ${version} | ![${name}](${jsrLink}) |`;
};
const mdBody = `| Name  | Description | Version | Registry |\n| --- | --- | --- | \n${Object.entries(pkgDetails).map(pkgToMdRow).join('\n')}\n\n`;
const mdFooter = `Made with ❤️ by [jackcarey](https://jackcarey.co.uk/)`;
const markdownContent = `${mdHeader}\n${mdBody}\n${mdFooter}`.trim();

// Write the markdown content to the README.md file
const readmePath = path.join(repoRootDir, 'README.md');
fs.writeFileSync(readmePath, markdownContent);

console.log(count + ' package details saved to README.md');