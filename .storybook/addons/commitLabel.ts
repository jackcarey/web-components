import { addons, types } from '@storybook/manager-api';
import fs from 'fs';
import path from 'path';

const commitHashPath = path.resolve(__dirname, '../last-commit-hash.txt');
const commitHash = fs.existsSync(commitHashPath)
  ? fs.readFileSync(commitHashPath, 'utf-8').trim()
  : undefined;

const addonId = 'commitLabel';

if (!commitHash) {
  console.info(
    'No commit hash found. Make sure to run the `store-commit-hash` script before starting the Storybook server.'
  );
} else {
  console.info(`Commit hash found for the UI: '${commitHash}'`);
}

addons.register(addonId, () => {
  addons.add(addonId, {
    title: 'Commit Label',
    type: types.TOOL,
    render: () => {
      console.error('Rendering commit label: ' + commitHash);
      return `<span>${commitHash}</span>`;
    },
  });
});
