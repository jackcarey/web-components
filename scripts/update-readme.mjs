import fs from 'fs';
import os from 'os';
import path from 'path';
import PackageJson from '@npmcli/package-json';

// Get the root directory of the repository
const rootDir = process.cwd();

console.log('compiling packages for readme from:', rootDir);

// Get a list of all directories at the root level that contain a package.json file
const packageDirectories = fs.readdirSync(rootDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(directory => path.join(rootDir, directory.name))
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
const relativeLink = (dir) => "/" + path.relative(rootDir, dir);
const pkgToMdRow = ([dir, pkgJson]) => `| [${pkgJson?.name ?? '-'}](${relativeLink(dir)}) | ${pkgJson?.version ?? '-'} | ${pkgJson?.description ?? '-'} |`;
const mdBody = `| Package | Version | Description |\n| --- | --- | --- | \n${Object.entries(pkgDetails).map(pkgToMdRow).join('\n')}\n\n`;
const mdFooter = `Made with ❤️ by [jackcarey](https://jackcarey.co.uk/)`;
const markdownContent = `${mdHeader}\n${mdBody}\n${mdFooter}`.trim();

// Write the markdown content to the README.md file
const readmePath = path.join(rootDir, 'README.md');
fs.writeFileSync(readmePath, markdownContent);

console.log(count + ' package details saved to README.md');