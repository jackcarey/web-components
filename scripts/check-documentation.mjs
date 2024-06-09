import fs from 'fs';
import path from "path";
import { repoRootDir, pkgDetails } from "./util-packages.mjs";

/**
 * check documentation for all packages
 */

const missingDocs = [];
const missingStories = [];

Object.entries(pkgDetails).forEach(([dir, pkgJson]) => {
    const name = pkgJson?.name;
    const docsPath = path.join(dir, 'DOCUMENTATION.md');
    const storiesPath = path.join('storybook-docs', `${pkgJson.name}.stories.ts`);
    const hasDocs = fs.existsSync(docsPath) && fs.readFileSync(docsPath, 'utf8').length > 0;
    const hasStories = fs.existsSync(storiesPath) && fs.readFileSync(storiesPath, 'utf8').length > 0;
    if (!hasDocs) {
        try {
            console.log('Creating default docs for', name);
            fs.writeFileSync(docsPath, `See [jackcarey/web-components](https://github.com/jackcarey/web-components) on GitHub.`);
        } catch (e) {
            missingDocs.push(name);
        }
    }
    if (!hasStories) missingStories.push(name);
});

if (missingDocs.length) {
    console.error(missingDocs.length, 'Missing DOCUMENTATION.md files:');
    missingDocs.forEach(doc => console.error("-", doc));
}
if (missingStories.length) {
    console.error(missingStories.length, 'Missing stories files:');
    missingStories.forEach(stories => console.error("-", stories));
}
if (missingDocs.length || missingStories.length) {
    process.exit(1);
}
console.log('All packages have documentation and stories');