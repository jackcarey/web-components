import { logExecSync, lastCommitHashFilePath } from './util-packages.mjs';

try {
    const excludedPaths = ['docs/project.json', '.storybook/last-commit-hash.txt', 'last-commit-hash.txt', lastCommitHashFilePath].map(path => path.toLowerCase());

    // Get the list of changed files in the latest commit that we want to watch
    const allChanges = logExecSync('git diff --name-only').toString().split('\n');

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
            logExecSync(`git config --global user.email "actions@github.com"`);
            logExecSync(`git config --global user.name "[GitHub Actions]"`);
            logExecSync(`git commit -a -m "[GH Actions] Update documentation and package files" || exit 0`);
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
    throw error;
}