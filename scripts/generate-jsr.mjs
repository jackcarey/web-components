/**
 * generate a JSR package object from a package.json file
 */
import fs from 'fs';
import path from "path";
import { repoRootDir, pkgDetails } from "./get-packages.mjs";

console.log('compiling packages for jsr from:', repoRootDir);

const jsrScope = 'web-components';

Object.entries(pkgDetails).forEach(([dir, pkgJson]) => {
    const name = pkgJson?.name;
    const version = pkgJson?.version;
    if (!name) throw new Error('Package name not found in package.json');
    if (!version) throw new Error('Package version not found in package.json');
    const jsrJson = {
        "name": `@${jsrScope}/${name}`,
        "version": version,
        "exports": "./index.ts"
    };
    const jsrPath = path.join(dir, 'jsr.json');
    console.log('writing jsr package to:', dir, jsrPath);
    fs.writeFileSync(jsrPath, JSON.stringify(jsrJson, null, 2));
});