import { execSync } from 'child_process';

try {
    // Get the list of changed files in the latest commit
    const changedFiles = execSync('git diff --name-only HEAD~1..HEAD').toString().split('\n');

    if (changedFiles.length > 0) {
        console.log(changedFiles);
    }

    // Check if any file other than /storybook-static/project.json has changed
    const hasChangedFiles = changedFiles.some(file => file !== '/storybook-static/project.json');

    if (hasChangedFiles) {
        console.log('Changes detected. Committing and pushing...');
        execSync(`git config --global user.email "action@github.com"`);
        execSync(`git config --global user.name "GitHub Action"`);
        execSync(`git commit -a -m "[GH Actions] Update documentation and package files" || exit 0`);
        execSync(`git push`);
        console.log(`Successfully pushed changes.`);
    } else {
        console.log('No changes to be saved.');
    }
} catch (error) {
    console.error('An error occurred:', error);
}