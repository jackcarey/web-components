import fs from 'fs';
import { repoRootDir, pkgDetails } from './get-packages.mjs';

return !Object.keys(pkgDetails).some((name) => {
  const isUtility = !name.includes('-');
  const path = `${repoRootDir}/stories/${isUtility ? 'utilities' : 'components'}/${name}.stories.ts`;
  return fs.existsSync(path);
});
