import { execSync }from 'child_process';
import fs from 'fs';
import path from 'path';
import { repoRootDir } from './util-packages.mjs';

// Get the last commit hash
const commitHash = execSync('git rev-parse HEAD').toString().trim();

// Define the output file path
const outputPath = path.join(repoRootDir, '/.storybook/last-commit-hash.txt');

// Write the commit hash to the file
fs.writeFileSync(outputPath, commitHash, 'utf8');

console.log(`Last commit hash (${commitHash}) saved to ${outputPath}`);