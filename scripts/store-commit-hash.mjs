import { execSync } from 'child_process';
import fs from 'fs';
import { repoRootDir, lastCommitHashFilePath } from './util-packages.mjs';

// Get the latest commit hash that contains changes to any jsr.json file
const commitHash = execSync("git log -n 1 --pretty=format:%H -- '**/jsr.json'", { cwd: repoRootDir }).toString().trim();

// Write the commit hash to the file if the file contents would change
if (!fs.existsSync(lastCommitHashFilePath) || fs.readFileSync(lastCommitHashFilePath, 'utf8') !== commitHash) {
    fs.writeFileSync(lastCommitHashFilePath, commitHash, 'utf8');
    console.log(`Last commit hash for jsr.json files (${commitHash}) saved to ${lastCommitHashFilePath}`);
} else {
    console.log(`Last commit hash for jsr.json files (${commitHash}) already saved to ${lastCommitHashFilePath}`);
}
