import fs from 'fs';
import { repoRootDir, pkgDetails } from "./get-packages.mjs";

const componentNames = Object.values(pkgDetails).filter(pkg => pkg?.name !== "autoloader").map(pkg => pkg.name);
const autoloaderPath = `${repoRootDir}/packages/autoloader/index.ts`;
//to do: fix the script urls here
const autoLoaderContent = `window.addEventListener("DOMContentLoaded", () => {
    const components = ${JSON.stringify(componentNames)};
    components.forEach(component => {
        const script = document.createElement('script');
        script.src = \`/packages/\${component}.js\`;
        document.head.appendChild(script);
    });
});`;
fs.writeFileSync(autoloaderPath, autoLoaderContent);