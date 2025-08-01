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
const existingContent = fs.existsSync(autoloaderPath) ? fs.readFileSync(autoloaderPath, 'utf8') : '';
const newAutoLoaderContent = `const components = ${JSON.stringify(componentVersions)};\nexport default components;`;

const hasContentChanged = !!(existingContent?.length) || existingContent !== newAutoLoaderContent;

if (hasContentChanged) {
    fs.writeFileSync(autoloaderPath, newAutoLoaderContent);
    console.log('Autoloader list updated', newAutoLoaderContent);
} else {
    console.log('No changes to autoloader list');
}