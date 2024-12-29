/**
 * generate a JSR package object from a package.json file
 */
import fs from 'fs';
import path from "path";
import { repoRootDir, pkgDetails } from "./util-packages.mjs";

console.log('compiling packages for jsr from:', repoRootDir);

const jsrScope = 'web-components';

Object.entries(pkgDetails).forEach(([dir, pkgJson]) => {
    const jsrPath = path.join(dir, 'jsr.json');
    const isPrivate = pkgJson?.private;
    if (isPrivate) {
        fs.rmSync(jsrPath, { force: true });
        console.log('JSR file deleted:', jsrPath);
        return;
    }
    const name = pkgJson?.name;
    const version = pkgJson?.version;
    const entry = pkgJson?.main ?? "./index.ts";
    if (!name) throw new Error('Package name not found in package.json');
    if (!version) throw new Error('Package version not found in package.json');
    const jsrJson = {
        "name": `@${jsrScope}/${name}`,
        "version": version,
        "exports": entry,
    };
    const existingContent = fs.existsSync(jsrPath) ? fs.readFileSync(jsrPath, 'utf8') : null;
    const newContent = JSON.stringify(jsrJson, null, 2);
    if (existingContent !== newContent) {
        fs.writeFileSync(jsrPath, newContent);
        console.log('JSR object updated at ', jsrPath);
    } else {
        console.log('No changes to JSR object at', jsrPath);
    }
});