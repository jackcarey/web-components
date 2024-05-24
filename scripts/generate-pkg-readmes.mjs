import fs from 'fs';
import path from 'path';
import { repoRootDir, pkgDetails, count } from "./get-packages.mjs";

console.log('generating package readmes from...');

Object.entries(pkgDetails).forEach(([dir, pkgJson]) => {
    const readmePath = path.join(dir, 'README.md');
    const readmeContent = `# ${pkgJson.name}\n\nversion: ${pkgJson.version}\n\n${pkgJson.description}`;
    fs.writeFileSync(readmePath, readmeContent);
});

console.log(count + ' package details saved to README files');