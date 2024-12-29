import { pkgDetails } from './util-packages.mjs';
import fs from 'fs';

const dryRunString = Object.entries(pkgDetails).filter(pkg => !pkg["private"]).map(([dir]) => `cd "${dir}"\nnpx jsr publish --allow-dirty --dry-run`).join('\n');
const publishString = Object.entries(pkgDetails).filter(pkg => !pkg["private"]).map(([dir]) => `cd "${dir}"\nnpx jsr publish --allow-dirty`).join('\n');

const dryRunPath = './scripts/publish-jsr-dryrun.sh';
const existingDryContent = fs.readFileSync(dryRunPath, 'utf8');

if (existingDryContent !== dryRunString) {
    fs.writeFileSync(dryRunPath, dryRunString, 'utf8');
}

const publishPath = './scripts/publish-jsr.sh';
const existingPublishContent = fs.readFileSync(dryRunPath, 'utf8');

if (existingPublishContent !== publishString) {
    fs.writeFileSync(publishPath, publishString, 'utf8');
    console.log('Publish scripts updated');
} else {
    console.log('No changes to publish scripts');
}