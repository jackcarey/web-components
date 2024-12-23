const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Get the last commit hash
const commitHash = execSync('git rev-parse HEAD').toString().trim();

// Define the output file path
const outputPath = path.join(__dirname, '..', '.storybook', 'last-commit-hash.txt');

// Write the commit hash to the file
fs.writeFileSync(outputPath, commitHash, 'utf8');

console.log(`Last commit hash (${commitHash}) saved to ${outputPath}`);