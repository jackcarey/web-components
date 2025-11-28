// Custom Element names must include hyphens so the packages do too. Utility packages named without hyphens like 'autoloader' and 'query' won't be included.
import fs from 'fs';
import { repoRootDir, pkgDetails } from "./util-packages.mjs";

const componentVersions = {};

Object.values(pkgDetails).forEach(pkg => {
    if (pkg?.name?.includes("-")) {
        componentVersions[pkg.name] = pkg.version;
    }
});

const autoloaderPath = `${repoRootDir}/packages/autoloader/components.ts`;
const autoLoaderDocsPath = `${repoRootDir}/packages/autoloader/DOCUMENTATION.md`;
const existingContent = fs.existsSync(autoloaderPath) ? fs.readFileSync(autoloaderPath, 'utf8') : '';
const newAutoLoaderContent = `const components: Record<string, string> = ${JSON.stringify(componentVersions)};\nexport default components;`;
const newDocsContent = `The 'autoloader' has no options.
Component script tags are added to the head of the document using the [esm.sh CDN](https://esm.sh/). 
This is done when the components are first seen in the DOM and when the DOM is updated.
Utilities are not loaded with the autoloader, only DOM components.
DOM components are are versioned to match each autoloader release.
This version includes the following components:\n${Object.entries(componentVersions).map(([name, version]) => `\n- \`${name}\`: v${version}`).join('')}\n\n`;

const hasContentChanged = !!(existingContent?.length) || existingContent !== newAutoLoaderContent;

if (hasContentChanged) {
    fs.writeFileSync(autoloaderPath, newAutoLoaderContent);
    fs.writeFileSync(autoLoaderDocsPath, newDocsContent);
    console.log('Autoloader list updated', newAutoLoaderContent);
} else {
    console.log('No changes to autoloader list');
}