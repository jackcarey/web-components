import fs from 'fs';

const result = fs.existsSync(`${process.cwd()}/stories/results.json`);
if(!result) {
  console.error('No results file');
}else{
    console.log('Results file exists');
}
process.exit(result ? 0 : 1);