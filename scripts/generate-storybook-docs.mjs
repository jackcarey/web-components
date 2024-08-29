import { pkgDetails, repoRootDir } from './util-packages.mjs';
import fs from 'node:fs';
import path from 'node:path';

const mdToSbMdx = (docPath,title) => {
  return `import { Meta, Markdown } from "@storybook/blocks";\nimport Docs from "${docPath}?raw";\n\n<Meta title="${title}"/>\n<Markdown>{Docs}</Markdown>`;
};

const createRelativeSBDocPath = (pathStr) => {
  // this is reliant upon the pathStr being in root/storybook-docs/[some folder name] 
  return pathStr.replace(repoRootDir, '../..');
};

const saveToStorybookFolder = (content, folder, fileName) => {
  const fullPath = path.join(repoRootDir, "storybook-docs", folder, fileName);
  const pathExists = fs.existsSync(fullPath);
  let existingSbContent = '';
  if (pathExists) {
    existingSbContent = fs.readFileSync(fullPath, 'utf8');
  }
  if (pathExists) {
    if (!content) {
      console.log(`Removing storybook documentation from ${fullPath}`);
      fs.unlinkSync(fullPath);
    }
    const hasChanged = existingSbContent !== content;
    if (hasChanged) {
      fs.writeFileSync(fullPath, content, 'utf8');
      console.debug(`Updated storybook documentation for ${fileName} at ${fullPath}`);
    } else {
      console.debug(`No changes to storybook documentation for ${fileName}`);
    }
  } else {
    if (content) {
      fs.writeFileSync(fullPath, content, 'utf8');
      console.debug(`Created storybook documentation for ${fileName} at ${fullPath}`);
    }
  }
}

//find all packages with documentation
const docPaths = Object.entries(pkgDetails)
  .map(([dir, pkgDetails]) => [pkgDetails.name, `${dir}/DOCUMENTATION.md`])
  .filter(([_, docPath]) => fs.existsSync(docPath));

docPaths.forEach(([pkgName, docPath]) => {
  const mdContent = fs.readFileSync(docPath, 'utf8');
  const isUtility = !pkgName.includes('-');
  const relativePath = createRelativeSBDocPath(docPath);
  const newComponentContent = mdToSbMdx(relativePath, `${isUtility ? "utilities" : "components"}/${pkgName}/Documentation`);
  const newUtilityContent = `# ${pkgName}\n\n ${mdContent}`;
  const newSbContent = isUtility ? newUtilityContent : newComponentContent;
  saveToStorybookFolder(newSbContent, isUtility ? 'utilities' : 'components', `${pkgName}.mdx`);
});

const readmePath = createRelativeSBDocPath(`${repoRootDir}/README.md`);
saveToStorybookFolder(mdToSbMdx(readmePath,"About"), 'about', 'about.mdx');