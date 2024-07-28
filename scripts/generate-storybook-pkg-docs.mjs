import { pkgDetails, repoRootDir } from './get-packages.mjs';
import fs from 'fs';

//find all packages with documentation
const docPaths = Object.entries(pkgDetails)
  .map(([dir, pkgDetails]) => [pkgDetails.name, `${dir}/DOCUMENTATION.md`])
  .filter(([_, docPath]) => fs.existsSync(docPath));

docPaths.forEach(([pkgName, docPath]) => {
  const mdContent = fs.readFileSync(docPath, 'utf8');
  const hasMdContent = mdContent.length > 0;
  const sbPath = `${repoRootDir}/stories/docs/${pkgName}.mdx`;
  const isUtility = !pkgName.includes('-');
  const newComponentContent = `import { Meta, Markdown } from "@storybook/blocks";\nimport Docs from "${docPath}?raw";\n\n<Meta title="${pkgName}/Information"/>\n<Markdown>{Docs}</Markdown>`;
  const newUtilityContent = `# ${pkgName}\n\n ${mdContent}`;
  const newSbContent = isUtility ? newUtilityContent : newComponentContent;
  let existingSbContent = '';
  if (fs.existsSync(sbPath)) {
      existingSbContent = fs.readFileSync(sbPath, 'utf8');
  }
  if(!hasMdContent && fs.existsSync(sbPath)) {
    console.log(`Removing storybook documentation for ${pkgName}`);
    fs.unlinkSync(sbPath);
  } else if (hasMdContent && newSbContent && existingSbContent !== newSbContent) {
    fs.writeFileSync(sbPath, newSbContent, 'utf8');
    console.debug(`Updated storybook documentation for ${pkgName}`);
  } else {
    console.debug(`No changes to storybook documentation for ${pkgName}`);
  }
});