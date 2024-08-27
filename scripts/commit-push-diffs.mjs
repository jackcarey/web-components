import { execSync } from 'child_process';

try {
    // Get the list of changed files in the latest commit
    const changedFiles = execSync('git diff --name-only').toString().split('\n');

    if (changedFiles.length > 0) {
        console.log(changedFiles);
    }

    const excludedPaths = ['/storybook-static/project.json'].map(path => path.toLowerCase());

    // Check if any of the changed files are not in the excluded paths
    const hasChangedFiles = changedFiles.some(file => !excludedPaths.includes(file.toLowerCase()));

    console.log('diffed files:');
    console.log(changedFiles.join('\n'));
    if (hasChangedFiles) {
        console.log('Changes detected. Committing and pushing...');
        try {
            const configEmailBuffer = execSync(`git config --global user.email "action@github.com"`);
            if (configEmailBuffer.length > 0) {
                console.log(configEmailBuffer.toString());
            }
            const configNameBuffer = execSync(`git config --global user.name "[GitHub Action]"`);
            if (configNameBuffer.length > 0) {
                console.log(configNameBuffer.toString());
            }
            const addBuffer = execSync(`git add .`);
            if (addBuffer.length > 0) {
                console.log(addBuffer.toString());
            }
            const commitBuffer = execSync(`git commit -m "[GH Actions] Update documentation and package files" || exit 0`);
            if (commitBuffer.length > 0) {
                console.log(commitBuffer.toString());
            }
            const pushBuffer = execSync(`git push`);
            if (pushBuffer.length > 0) {
                console.log(pushBuffer.toString());
            }
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