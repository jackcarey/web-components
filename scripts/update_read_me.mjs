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
const pkgDetails = [];
await Promise.all(packageDirectories.map(async (dir) => {
    console.log('reading package.json from:', dir);
    return PackageJson.load(dir).then(json => {
        console.log({ json });
        pkgDetails.push(json);
    });
}));

// Generate the markdown content
const mdHeader = `# web-components\n\nThis repository contains a collection of ${pkgDetails.length} web components for various purposes. Each component is published as a separate package with their own readme. Below is a list of all the components along with their version and description.\n\n---\n\n`;
const mdBody = `| Package | Version | Description |\n| --- | --- | --- | \n${pkgDetails.map(pkg => `| ${pkg.name} | ${pkg.version} | ${pkg.description} |`).join('\n')}\n\n`;
const emojiList = ["💖", "❤️", "💙", "💛", "💚", "🧡", "🖤", "🤍", "🩷", "💜", "💗"];
const emoji = emojiList[Math.floor(Math.random() * emojiList.length)];
const mdFooter = `Made with ${emoji} by[jackcarey](https://jackcarey.co.uk/)`;
const markdownContent = `${mdHeader}\n${mdBody}\n${mdFooter}`.trim();

// Write the markdown content to the README.md file
const readmePath = path.join(rootDir, 'README.md');
fs.writeFileSync(readmePath, markdownContent);

console.log(pkgDetails.length + ' package details saved to README.md');