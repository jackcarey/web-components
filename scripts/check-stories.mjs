import fs from 'fs';
import { repoRootDir, pkgDetails } from "./get-packages.mjs";

return !Object.keys(pkgDetails).some(name => {
    return fs.existsSync(`${repoRootDir}/stories/${name}.stories.ts`);
});