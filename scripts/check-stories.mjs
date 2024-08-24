import fs from 'fs';
import { repoRootDir, pkgDetails } from './util-packages.mjs';

const allExist = Object.values(pkgDetails).every(({ name }) => {
  const isUtility = !name.includes('-');
  const path = `${repoRootDir}/stories/${isUtility ? 'utilities' : 'components'}/${name}.stories.ts`;
  const exists = fs.existsSync(path);
  if (!exists) {
    console.error(
      `No stories for ${isUtility ? 'utility' : 'component'} ${name} \n  - @ ${path}`
    );
  }
  return exists;
});

if (!allExist) {
  console.error('Missing stories');
  process.exit(1);
}
