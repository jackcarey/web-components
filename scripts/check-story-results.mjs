import fs from 'fs';
import { repoRootDir } from "./get-packages.mjs";

return !fs.existsSync(`${repoRootDir}/stories/results.json`);