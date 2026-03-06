import { pkgDetails, repoRootDir } from './util-packages.mjs';
import fs from 'node:fs';
import path from 'node:path';

const getSbDocsFolderPath = (folder) => path.join(repoRootDir, 'storybook-docs', folder);

const mdToSbMdx = (absoluteDocPath, outputDir, title) => {
  const sanitizedPath = absoluteDocPath.replace(/\\/g, '/');
  const rel = path.relative(outputDir, sanitizedPath).replace(/\\/g, '/');
  const relativePath = rel.startsWith('.') ? rel : `./${rel}`;
  const imports = [
    `import { Meta, Markdown } from "@storybook/addon-docs/blocks";`,
    `import Docs from "${relativePath}?raw";`
  ].join('\n');
  return `${imports}\n\n<Meta title="${title}"/>\n<Markdown>{Docs}</Markdown>`;
};

const saveFile = (content, fullPath) => {
  const pathExists = fs.existsSync(fullPath);
  const existingContent = pathExists ? fs.readFileSync(fullPath, 'utf8') : '';
  if (pathExists) {
    if (!content) {
      console.log(`No content. Removing storybook documentation from ${fullPath}`);
      fs.unlinkSync(fullPath);
    } else if (existingContent !== content) {
      fs.writeFileSync(fullPath, content, 'utf8');
      console.debug(`Updated storybook documentation at ${fullPath}`);
    } else {
      console.debug(`No changes to storybook documentation at ${fullPath}`);
    }
  } else if (content) {
    fs.writeFileSync(fullPath, content, 'utf8');
    console.debug(`Created storybook documentation at ${fullPath}`);
  }
};

//find all packages with documentation and generate MDX files co-located in the package directory
const docPaths = Object.entries(pkgDetails)
  .map(([dir, pkgDetails]) => [pkgDetails.name, dir, `${dir}/README.md`])
  .filter(([_, _dir, docPath]) => fs.existsSync(docPath));

docPaths.forEach(([pkgName, pkgDir, docPath]) => {
  const isUtility = !pkgName.includes('-');
  const categoryStr = isUtility ? 'utilities' : 'components';
  const outputPath = path.join(pkgDir, `${pkgName}.mdx`);
  const newSbContent = mdToSbMdx(
    docPath,
    pkgDir,
    `${categoryStr}/${pkgName}/Documentation`
  );
  saveFile(newSbContent, outputPath);
});

const readmePath = `${repoRootDir}/README.md`;
const aboutDir = getSbDocsFolderPath('about');
saveFile(mdToSbMdx(readmePath, aboutDir, 'About'), path.join(aboutDir, 'about.mdx'));
