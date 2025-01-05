import { getJSRMarkdown, pkgDetails, repoRootDir } from './util-packages.mjs';
import fs from 'node:fs';
import path from 'node:path';

const mdToSbMdx = (docPath, title) => {
  const sanitizedPath = docPath.replace(/\\/g, '/');
  return `import { Meta, Markdown } from "@storybook/blocks";\nimport Docs from "${sanitizedPath}?raw";\n\n<Meta title="${title}"/>\n<Markdown>{Docs}</Markdown>`;
};

const saveToStorybookFolder = (content, folder, fileName) => {
  const fullPath = path.join(repoRootDir, 'storybook-docs', folder, fileName);
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
  const newComponentContent = mdToSbMdx(
    docPath,
    `${isUtility ? 'utilities' : 'components'}/${pkgName}/Documentation`
  );
  const newUtilityContent = `# ${pkgName}\n\n ${mdContent}`;
  const headerContent = `# ${pkgName}\n${getJSRMarkdown(pkgName)}`;
  const newSbContent = `${headerContent}\n${isUtility ? newUtilityContent : newComponentContent}`;
  saveToStorybookFolder(
    newSbContent,
    isUtility ? 'utilities' : 'components',
    `${pkgName}.mdx`
  );
});

const readmePath = `${repoRootDir}/README.md`;
saveToStorybookFolder(mdToSbMdx(readmePath, 'About'), 'about', 'about.mdx');
