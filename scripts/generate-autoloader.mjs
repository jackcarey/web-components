import fs from 'fs';
import { repoRootDir, pkgDetails } from "./get-packages.mjs";

const componentNames = Object.values(pkgDetails).filter(pkg => pkg?.name !== "autoloader").map(pkg => pkg.name);
const autoloaderPath = `${repoRootDir}/packages/autoloader/index.ts`;
//to do: fix the script urls here
const autoLoaderContent = `window.addEventListener("DOMContentLoaded", () => {
    const components = ${JSON.stringify(componentNames)};
    components.forEach(component => {
        if(!document.querySelector(component)) return;
        const script = document.createElement('script');
        script.src = \`/packages/\${component}.js\`;
        document.head.appendChild(script);
    });

    const observer = new MutationObserver((mutationsList, observer) => {
        for (let mutation of mutationsList) {
            if (mutation.type === 'childList') {
                const addedNodes = Array.from(mutation.addedNodes);
                addedNodes.forEach(node => {
                    if (node.nodeType === Node.ELEMENT_NODE) {
                        const componentName = node.tagName.toLowerCase();
                        if (components.includes(componentName)) {
                            const script = document.createElement('script');
                            script.src = \`/packages/\${componentName}.js\`;
                            document.head.appendChild(script);
                        }
                    }
                });
            }
        }
    });

    observer.observe(document.body, { childList: true, subtree: true });
});`;
fs.writeFileSync(autoloaderPath, autoLoaderContent);