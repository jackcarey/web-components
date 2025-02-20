import { getJSRMarkdown, pkgDetails, repoRootDir } from './util-packages.mjs';
import fs from 'node:fs';
import path from 'node:path';

const getSbDocsFolderPath = (folder) => path.join(repoRootDir, 'storybook-docs', folder);

const mdToSbMdx = (absoluteDocPath, folder, title) => {
  const sanitizedPath = absoluteDocPath.replace(/\\/g, '/');
  const relativePath = path.relative(getSbDocsFolderPath(folder), sanitizedPath);
  return `import { Meta, Markdown } from "@storybook/blocks";\nimport Docs from "${relativePath}?raw";\n\n<Meta title="${title}"/>\n<Markdown>{Docs}</Markdown>`;
};

const saveToStorybookFolder = (content, folder, fileName) => { 
  const fullPath = path.join(getSbDocsFolderPath(folder), fileName);
  const pathExists = fs.existsSync(fullPath);
  let existingSbContent = '';
  if (pathExists) {
    existingSbContent = fs.readFileSync(fullPath, 'utf8');
  }
  if (pathExists) {
    if (!content) {
      console.log(`No content. Removing storybook documentation from ${fullPath}`);
      fs.unlinkSync(fullPath);
    }
    const hasChanged = existingSbContent !== content;
    if (hasChanged) {
      fs.writeFileSync(fullPath, content, 'utf8');
      console.debug(
        `Updated storybook documentation for ${fileName} at ${fullPath}`
      );
    } else {
      console.debug(`No changes to storybook documentation for ${fileName}`);
    }
  } else {
    if (content) {
      fs.writeFileSync(fullPath, content, 'utf8');
      console.debug(
        `Created storybook documentation for ${fileName} at ${fullPath}`
      );
    }
  }
};

//find all packages with documentation
const docPaths = Object.entries(pkgDetails)
  .map(([dir, pkgDetails]) => [pkgDetails.name, `${dir}/DOCUMENTATION.md`])
  .filter(([_, docPath]) => fs.existsSync(docPath));

docPaths.forEach(([pkgName, docPath]) => {
  const mdContent = fs.readFileSync(docPath, 'utf8');
  const isUtility = !pkgName.includes('-');
  const categoryStr = isUtility ? 'utilities' : 'components';
  const newComponentContent = mdToSbMdx(
    docPath,
    categoryStr,
    `${categoryStr}/${pkgName}/Documentation`
  );
  const newUtilityContent = `# ${pkgName}\n\n ${mdContent}`;
  const headerContent = `# ${pkgName}\n${getJSRMarkdown(pkgName)}`;
  const newSbContent = `${headerContent}\n${isUtility ? newUtilityContent : newComponentContent}`;
  saveToStorybookFolder(
    newSbContent,
    categoryStr,
    `${pkgName}.mdx`
  );
});

const readmePath = `${repoRootDir}/README.md`;
saveToStorybookFolder(mdToSbMdx(readmePath, 'about','About'), 'about', 'about.mdx');
