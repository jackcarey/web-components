import { logExecSync } from './util-packages.mjs';

try {
    const excludedPaths = ['storybook-static/project.json', '.storybook/last-commit-hash.txt'].map(path => path.toLowerCase());

    // Get the list of changed files in the latest commit that we want to watch
    const allChanges = execSync('git diff --name-only').toString().split('\n');

    console.log(`All changes:\n${allChanges.join('\n')}`);

    //keep only the files that we want to watch
    const changedFiles = allChanges.filter(file => {
        file = file.toLowerCase();
        if (file.length === 0) {
            return false;
        }
        if (excludedPaths.includes(file)) {
            return false;
        }
        if (excludedPaths.some(path => path.endsWith(file))) {
            return false;
        }
        return true;
    });

    if (changedFiles.length > 0) {
        console.log('Relevant changes detected.');
        try {
            logExecSync(`git config --global user.email "action@github.com"`);
            logExecSync(`git config --global user.name "[GitHub Action]"`);
            logExecSync(`git add .`);
            logExecSync(`git commit -m "[GH Actions] Update documentation and package files" || exit 0`);
            logExecSync(`git push`);
            console.log(`Successfully pushed changes.`);
        } catch (e) {
            console.error('An error occurred:', e);
            throw e;
        }
    } else {
        console.log('No relevant changes to be saved.');
    }
} catch (error) {
    console.error('An error occurred:', error);
}