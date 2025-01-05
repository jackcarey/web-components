import { execSync }from 'child_process';
import fs from 'fs';
import path from 'path';
import { repoRootDir } from './util-packages.mjs';

// Get the latest commit hash that contains changes in the packages folder
const commitHash = execSync('git log -n 1 --pretty=format:%H -- packages', { cwd: repoRootDir }).toString().trim();

// Define the output file path
const outputPath = path.join(repoRootDir, '/.storybook/last-commit-hash.txt');

// Write the commit hash to the file if the file contents would change
if (!fs.existsSync(outputPath) || fs.readFileSync(outputPath, 'utf8') !== commitHash) {
    fs.writeFileSync(outputPath, commitHash, 'utf8');
    console.log(`Last commit hash for packages/ folder (${commitHash}) saved to ${outputPath}`);
}else{
    console.log(`Last commit hash for packages/ folder (${commitHash}) already saved to ${outputPath}`);
}
