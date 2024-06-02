import fs from "fs";
import path from "path";
import { repoRootDir, pkgDetails, count } from "./get-packages.mjs";

console.log("compiling packages for root readme from:", repoRootDir);

const template = fs.readFileSync(
  path.join(repoRootDir, "doc-templates", "root-readme.md"),
  "utf8"
);

// Generate the markdown content
const relativeLink = (dir) => "/" + path.relative(repoRootDir, dir);
const pkgToMdRow = ([dir, pkgJson]) => {
  const name = pkgJson?.name ?? "-";
  const srcLink = `[${name}](${relativeLink(dir)})`;
  const description = pkgJson?.description ?? "-";
  const version = pkgJson?.version ?? "-";
  const licenseName = pkgJson?.license ?? "unlicensed";
  const licenseMd = `[${licenseName}](https://www.tldrlegal.com/search?query=${encodeURIComponent(
    licenseName
  )})`;
  const jsrScope = "web-components";
  const jsrBadgeUrl = `https://jsr.io/badges/@${jsrScope}/${name}`;
  const jsrVersionBadgeMd = `![${name}](${jsrBadgeUrl})`;
  const jsrLinkUrl = `https://jsr.io/@${jsrScope}/${name}`;
  const jsrVersionMd = `[${jsrVersionBadgeMd}](${jsrLinkUrl})`;
  const jsrScoreUrl = `${jsrBadgeUrl}/score`;
  const jsrScoreMd = `[![score](${jsrScoreUrl})](${jsrLinkUrl}/score)`;
  return `| ${srcLink} | ${description} | ${version} | ${licenseMd} | ${jsrVersionMd} ${jsrScoreMd} |`;
};
const mdBody = `| Name | Description | Version | License | Registry |\n| --- | --- | --- | --- | --- |\n${Object.entries(
  pkgDetails
)
  .map(pkgToMdRow)
  .join("\n")}\n\n`;

const replacements = {
  $count: count,
  $table: mdBody,
};

const readmeContent = Object.entries(replacements).reduce(
  (acc, [key, value]) => acc.replaceAll(key, value),
  template
);
const readmePath = path.join(repoRootDir, "README.md");
if (
  !fs.existsSync(readmePath) ||
  fs.readFileSync(readmePath, "utf8") !== readmeContent
) {
  fs.writeFileSync(readmePath, readmeContent);
  console.log(`README.md created at ${repoRootDir}`);
} else {
  console.log(`No changes to README.md at ${repoRootDir}`);
}