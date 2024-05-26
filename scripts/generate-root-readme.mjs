import fs from 'fs';
import path from 'path';
import { repoRootDir, pkgDetails, count } from "./get-packages.mjs";

console.log('compiling packages for root readme from:', repoRootDir);

// Generate the markdown content
const badgeUrl = `https://github.com/jackcarey/web-components/actions/workflows/main.yml/badge.svg?branch=main`;
const mdHeader = `# web-components\n\n## This repo is currently a work-in-progress.\n\n[![JSR Scope](https://jsr.io/badges/@web-components)](https://jsr.io/@web-components) ![update_publish workflow](${badgeUrl})\n\nThere are ${count} packages in this collection. Some are web components intended for the DOM, others are utilities that components consume. **Each is published with its own readme and license.** They are published to [jsr.io/@web-components](https://jsr.io/@web-components). The 'autoloader' can be used to load other components. \n\n`;
const relativeLink = (dir) => "/" + path.relative(repoRootDir, dir);
const pkgToMdRow = ([dir, pkgJson]) => {
    const name = pkgJson?.name ?? '-';
    const srcLink = `[${name}](${relativeLink(dir)})`;
    const description = pkgJson?.description ?? '-';
    const version = pkgJson?.version ?? '-';
    const licenseName = pkgJson?.license ?? 'unlicensed';
    const licenseMd = `[${licenseName}](https://www.tldrlegal.com/search?query=${encodeURIComponent(licenseName)})`;
    const jsrScope = 'web-components';
    const jsrBadgeUrl = `https://jsr.io/badges/@${jsrScope}/${name}`;
    const jsrVersionBadgeMd = `![${name}](${jsrBadgeUrl})`;
    const jsrLinkUrl = `https://jsr.io/@${jsrScope}/${name}`;
    const jsrVersionMd = `[${jsrVersionBadgeMd}](${jsrLinkUrl})`;
    const jsrScoreUrl = `${jsrBadgeUrl}/score`;
    const jsrScoreMd = `[![score](${jsrScoreUrl})](${jsrLinkUrl})`;
    return `| ${srcLink} | ${description} | ${version} | ${licenseMd} | ${jsrVersionMd} ${jsrScoreMd} |`;
};
const mdBody = `| Name | Description | Version | License | Registry |\n| --- | --- | --- | --- | --- |\n${Object.entries(pkgDetails).map(pkgToMdRow).join('\n')}\n\n`;
const mdFooter = `Made with ❤️ by [jackcarey](https://jackcarey.co.uk/)`;
const markdownContent = `${mdHeader}\n${mdBody}\n${mdFooter}`.trim();

// Write the markdown content to the README.md file
const readmePath = path.join(repoRootDir, 'README.md');
// Check if the content has changed
const currentContent = fs.readFileSync(readmePath, 'utf8');
if (currentContent !== markdownContent) {
    fs.writeFileSync(readmePath, markdownContent);
    console.log(count + ' package details saved to README.md');
} else {
    console.log('No changes to README.md')
}
