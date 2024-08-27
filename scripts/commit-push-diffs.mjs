import { execSync } from 'child_process';

const logExecSync = (command) => {
    const buffer = execSync(command);
    if (buffer.length > 0) {
        console.log(buffer.toString());
    }
}

try {
    const excludedPaths = ['/storybook-static/project.json'].map(path => path.toLowerCase());

    // Get the list of changed files in the latest commit that we want to watch
    const allChanges = execSync('git diff --name-only').toString().split('\n');

    console.log(allChanges.join('\n'));

    const changedFiles = allChanges.filter(file => file.length > 0 && !excludedPaths.includes(file.toLowerCase()));

    if (changedFiles.length > 0) {
        console.log('Changes detected.');
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
        console.log('No changes to be saved.');
    }
} catch (error) {
    console.error('An error occurred:', error);
}