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
    const entry = pkgJson?.main ?? "./index.ts";
    if (!name) throw new Error('Package name not found in package.json');
    if (!version) throw new Error('Package version not found in package.json');
    const jsrJson = {
        "name": `@${jsrScope}/${name}`,
        "version": version,
        "exports": entry,
    };
    const jsrPath = path.join(dir, 'jsr.json');
    console.log('writing JSR object to:', dir, jsrPath);
    const existingContent = fs.existsSync(jsrPath) ? fs.readFileSync(jsrPath, 'utf8') : null;
    const newContent = JSON.stringify(jsrJson, null, 2);
    if (existingContent !== newContent) {
        fs.writeFileSync(jsrPath, newContent);
    }
});