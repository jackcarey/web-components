import fs from 'fs';
import path from 'path';
import { repoRootDir, pkgDetails, count } from "./get-packages.mjs";

console.log('generating package readmes from...');

Object.entries(pkgDetails).forEach(([dir, pkgJson]) => {
    const readmePath = path.join(dir, 'README.md');
    const esmShHref = `https://esm.sh/jsr/@web-components/${pkgJson.name}`;
    const readmeContent = `# ${pkgJson.name}\n\n**version:** ${pkgJson.version}\n\n> ${pkgJson.description}\n\nUse in a browser with [${esmShHref}](${esmShHref})\n\nMade by [jackcarey](https://jackcarey.co.uk).`;
    if (!fs.existsSync(readmePath) || fs.readFileSync(readmePath, 'utf8') !== readmeContent) {
        fs.writeFileSync(readmePath, readmeContent);
    }
});

console.log(count + ' package details saved to README files');