import fs from 'fs';
import { repoRootDir, pkgDetails } from './get-packages.mjs';

const allExist = Object.keys(pkgDetails).all((name) => {
  const isUtility = !name.includes('-');
  const path = `${repoRootDir}/stories/${isUtility ? 'utilities' : 'components'}/${name}.stories.ts`;
  const exists = fs.existsSync(path);
  if(!exists) {
    console.error(`No stories for ${name}`);
  }
  return exists;
});

if (!allExist) {
  console.error('Missing stories');
  process.exit(1);
}
