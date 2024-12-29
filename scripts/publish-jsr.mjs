import { pkgDetails, logExecSync } from './util-packages.mjs';

Object.entries(pkgDetails).forEach(([dir, pkg]) => {
    if (pkg.private) {
        console.log(`Skipping, package '${pkg.name}' marked as private`);
    } else {
        console.log(`Dry run for package '${pkg.name}'...`);
        const dryRunCmd = `cd "${dir}"\nnpx jsr publish --allow-dirty --dry-run`;
        logExecSync(dryRunCmd);
    }
});
console.log('Dry runs complete!');

const branch = logExecSync('git rev-parse --abbrev-ref HEAD').toString().trim();

if (branch === 'main') {
    console.log('Publishing packages to JSR...');
    Object.entries(pkgDetails).forEach(([dir, pkg]) => {
        if (!pkg.private) {
            const publishCmd = `cd "${dir}"\nnpx jsr publish --allow-dirty`;
            logExecSync(publishCmd);
        }
    });
    console.log('Publish complete!');
} else {
    console.log('Not on main branch, skipping publish.');
}