import { execSync }from 'child_process's;
import fs from 'fs';
import path from 'path';

// Get the last commit hash
const commitHash = execSync('git rev-parse HEAD').toString().trim();

// Define the output file path
const outputPath = path.join(__dirname, '..', '.storybook', 'last-commit-hash.txt');

// Write the commit hash to the file
fs.writeFileSync(outputPath, commitHash, 'utf8');

console.log(`Last commit hash (${commitHash}) saved to ${outputPath}`);