import fs from 'fs';
import path from 'path';
import { repoRootDir, pkgDetails, count } from "./get-packages.mjs";

console.log('compiling packages for root readme from:', repoRootDir);

// Generate the markdown content
const badgeUrl = `https://github.com/jackcarey/web-components/actions/workflows/update_publish.yml/badge.svg?branch=main`;
const mdHeader = `# web-components\n\n## This repo is currently a work-in-progress.\n\n![update_publish workflow](${badgeUrl})\n\nThis is a collection of ${count} web components for various purposes. Each component is published as a separate package with its own readme. The 'autoloader' can be used to load other components. \n\n`;
const relativeLink = (dir) => "/" + path.relative(repoRootDir, dir);
const pkgToMdRow = ([dir, pkgJson]) => {
    const name = pkgJson?.name ?? '-';
    const srcLink = `[${name}](${relativeLink(dir)})`;
    const description = pkgJson?.description ?? '-';
    const version = pkgJson?.version ?? '-';
    const jsrScope = 'web-components';
    const jsrBadgeUrl = `https://jsr.io/badges/@${jsrScope}/${name}`;
    const jsrbadgeMd = `![${name}](${jsrBadgeUrl})`;
    const jsrLinkUrl = `https://jsr.io/@${jsrScope}/${name}`;
    const jsrLinkMd = `[${jsrbadgeMd}](${jsrLinkUrl})`;
    return `| ${srcLink} | ${description} | ${version} | ${jsrLinkMd} |`;
};
const mdBody = `| Name | Description | Version | Registry |\n| --- | --- | --- | --- |\n${Object.entries(pkgDetails).map(pkgToMdRow).join('\n')}\n\n`;
const mdFooter = `Made with ❤️ by [jackcarey](https://jackcarey.co.uk/)`;
const markdownContent = `${mdHeader}\n${mdBody}\n${mdFooter}`.trim();

// Write the markdown content to the README.md file
const readmePath = path.join(repoRootDir, 'README.md');
fs.writeFileSync(readmePath, markdownContent);

console.log(count + ' package details saved to README.md');