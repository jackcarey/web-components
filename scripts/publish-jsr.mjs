import { pkgDetails, logExecSync } from './util-packages.mjs';


const branch = logExecSync('git rev-parse --abbrev-ref HEAD').toString().trim();
const lastCommitMsg = logExecSync('git log -1 --pretty=%B').toString().trim();
const isGHAction = lastCommitMsg.startsWith('[GH Actions]');

Object.entries(pkgDetails).forEach(([dir, pkg]) => {
    const isAutoLoader = pkg.name.includes('autoloader');
    if (pkg.private || (isGHAction && !isAutoLoader)) {
        console.log(`Skipping, package '${pkg.name}' marked as private or not an autoloader in GH Action context`);
    } else {
        console.log(`Dry run for package '${pkg.name}'...`);
        const dryRunCmd = `cd "${dir}"\nnpx jsr publish --allow-dirty --dry-run`;
        logExecSync(dryRunCmd);
    }
});
console.log('Dry runs complete!');
console.log('-'.repeat(80));

if (branch === 'main') {
    console.log(`On main branch, isGHAction: ${isGHAction}`);
    if (isGHAction) {
        console.log('GitHub Action - only publishing auto-loader to JSR...');
        Object.entries(pkgDetails).forEach(([dir, pkg]) => {
            if (!pkg.private && pkg.name.includes('autoloader')) {
                const publishCmd = `cd "${dir}"\nnpx jsr publish --allow-dirty`;
                logExecSync(publishCmd);
            } else {
                console.log(`Skipping, package '${pkg.name}' not an autoloader or marked as private`);
            }
        });
    } else {
        console.log('Publishing packages to JSR...');
        Object.entries(pkgDetails).forEach(([dir, pkg]) => {
            if (!pkg.private) {
                const publishCmd = `cd "${dir}"\nnpx jsr publish --allow-dirty`;
                logExecSync(publishCmd);
            }
        });
    }
    console.log('Publish complete!');
} else {
    console.log('Not on main branch, skipping publish.');
}