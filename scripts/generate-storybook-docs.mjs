import { pkgDetails, repoRootDir } from './util-packages.mjs';
import fs from 'fs';
import path from 'path';

const saveToStorybookFolder = (content, folder, fileName) => {
  const fullPath = path.join(repoRootDir, "storybook-docs", folder, fileName);
  const pathExists = fs.existsSync(fullPath);
  let existingSbContent = '';
  if (pathExists) {
    existingSbContent = fs.readFileSync(fullPath, 'utf8');
  }
  if (pathExists) {
    if (!content) {
      console.log(`Removing storybook documentation for ${path}`);
      fs.unlinkSync(fullPath);
    }
    const hasChanged = existingSbContent !== content;
    if (hasChanged) {
      fs.writeFileSync(fullPath, content, 'utf8');
      console.debug(`Updated storybook documentation for ${fileName}`);
    } else {
      console.debug(`No changes to storybook documentation for ${fileName}`);
    }
  } else {
    if (content) {
      fs.writeFileSync(fullPath, content, 'utf8');
      console.debug(`Created storybook documentation for ${fileName}`);
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
  const newComponentContent = `import { Meta, Markdown } from "@storybook/blocks";\nimport Docs from "${docPath}?raw";\n\n<Meta title="${isUtility ? "utilities" : "components"}/${pkgName}/Documentation"/>\n<Markdown>{Docs}</Markdown>`;
  const newUtilityContent = `# ${pkgName}\n\n ${mdContent}`;
  const newSbContent = isUtility ? newUtilityContent : newComponentContent;
  saveToStorybookFolder(newSbContent, isUtility ? 'utilities' : 'components', `${pkgName}.mdx`);
});

const readmePath = `${repoRootDir}/README.md`;
const readmeContent = fs.readFileSync(readmePath, 'utf8');
saveToStorybookFolder(readmeContent, 'about', 'about.mdx');