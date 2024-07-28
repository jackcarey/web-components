import fs from 'fs';

const result = fs.existsSync(`${process.cwd()}/stories/results.json`);

process.exit(result ? 0 : 1);