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
const autoLoaderContent = `const components = ${JSON.stringify(componentVersions)};\nexport default components;`;

if (!fs.existsSync(autoloaderPath) || fs.readFileSync(autoloaderPath, 'utf8') !== autoLoaderContent) {
    fs.writeFileSync(autoloaderPath, autoLoaderContent);
    console.log('Autoloader list updated', autoLoaderContent);
} else {
    console.log('No changes to autoloader list');
}