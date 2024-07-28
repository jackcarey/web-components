import fs from 'fs';
import { repoRootDir } from "./get-packages.mjs";

const result = fs.existsSync(`${repoRootDir}/stories/results.json`);

process.exit(result ? 0 : 1);