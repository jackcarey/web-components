import fs from 'fs';
import { repoRootDir, pkgDetails } from './get-packages.mjs';

const result = Object.keys(pkgDetails).some((name) => {
  const isUtility = !name.includes('-');
  const path = `${repoRootDir}/stories/${isUtility ? 'utilities' : 'components'}/${name}.stories.ts`;
  const exists = fs.existsSync(path);
  if(!exists) {
    console.error(`No stories for ${name}`);
  }
  return exists;
});

if (result) {
  console.error('Missing stories');
  process.exit(1);
}
