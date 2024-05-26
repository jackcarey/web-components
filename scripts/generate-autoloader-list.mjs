import fs from 'fs';
import { repoRootDir, pkgDetails } from "./get-packages.mjs";

// Custom Element names must include hyphens so the packages do too. Utility packages like 'autoloader' and 'query' won't be included.
const componentNames = Object.values(pkgDetails).filter(pkg => String(pkg?.name ?? '').includes("-")).map(pkg => pkg.name);
const autoloaderPath = `${repoRootDir}/packages/autoloader/components.ts`;
const autoLoaderContent = `const components = ${JSON.stringify(componentNames)};export default components;`;

if (!fs.existsSync(autoloaderPath) || fs.readFileSync(autoloaderPath, 'utf8') !== autoLoaderContent) {
    fs.writeFileSync(autoloaderPath, autoLoaderContent);
    console.log('Autoloader list updated');
} else {
    console.log('No changes to autoloader list');
}