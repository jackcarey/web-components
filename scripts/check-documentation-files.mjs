import fs from 'fs';
import path from 'path';
import { repoRootDir, pkgDetails } from './util-packages.mjs';

/**
 * check documentation for all packages
 */

const missingDocs = [];
const missingLicense = [];
const missingStories = [];

const existsWithContent = (path) =>
  fs.existsSync(path) && fs.readFileSync(path, 'utf8').length > 0;

Object.entries(pkgDetails).forEach(([dir, pkgJson]) => {
  const name = pkgJson?.name;
  const docsPath = path.join(dir, 'DOCUMENTATION.md');
  const licensePath = path.join(dir, 'LICENSE.md');
  const storiesTSPath = path.join(dir, `${name}.stories.ts`);
  const storiesTSXPath = path.join(dir, `${name}.stories.tsx`);
  const hasDocs = existsWithContent(docsPath);
  const hasLicense = existsWithContent(licensePath);
  const hasStories =
    existsWithContent(storiesTSPath) || existsWithContent(storiesTSXPath);
  if (!hasDocs) {
    try {
      console.log('Creating default docs for', name);
      fs.writeFileSync(
        docsPath,
        `See [jackcarey/web-components](https://github.com/jackcarey/web-components) on GitHub.`
      );
    } catch (e) {
      missingDocs.push(name + ' - ' + docsPath);
    }
  }
  if (!hasLicense) missingLicense.push(name + ' - ' + licensePath);
  if (!hasStories) missingStories.push(name + ' - ' + storiesTSPath);
});

if (missingDocs.length) {
  console.error(missingDocs.length, 'Missing DOCUMENTATION.md files:');
  missingDocs.forEach((doc) => console.error('-', doc));
}
if (missingLicense.length) {
  console.error(missingLicense.length, 'Missing LICENSE.md files:');
  missingLicense.forEach((license) => console.error('-', license));
}
if (missingStories.length) {
  console.error(missingStories.length, 'Missing stories files:');
  missingStories.forEach((stories) => console.error('-', stories));
}
if (missingDocs.length || missingLicense.length || missingStories.length) {
  process.exit(1);
}
console.log('All packages have documentation and stories');
