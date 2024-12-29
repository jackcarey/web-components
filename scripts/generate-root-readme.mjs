import fs from "fs";
import path from "path";
import { repoRootDir, pkgDetails, count, getJSRMarkdown } from "./util-packages.mjs";

console.log("compiling packages for root readme from:", repoRootDir);

const template = fs.readFileSync(
  path.join(repoRootDir, "doc-templates", "root-readme.md"),
  "utf8"
);

// Generate the markdown content
const pagesLink = (dir) => "https://jackcarey.co.uk/web-components/" + path.relative(repoRootDir, dir);
const pkgToMdRow = ([dir, pkgJson]) => {
  const name = pkgJson?.name ?? "-";
  const srcLink = `[${name}](${pagesLink(dir)})`;
  const type = name.includes("-") ? "Component" : "Utility";
  const description = `${pkgJson?.description ?? ""} - **${type}**`.trim();
  const version = pkgJson?.version ?? "-";
  const licenseName = pkgJson?.license ?? "unlicensed";
  const licenseMd = `[${licenseName}](https://www.tldrlegal.com/search?query=${encodeURIComponent(
    licenseName
  )})`;
  return `| ${srcLink} | ${description} | ${version} | ${licenseMd} | ${getJSRMarkdown(name)} |`;
};
const mdBody = `| Name | Description | Version | License | Registry |\n| --- | --- | --- | --- | --- |\n${Object.entries(
  pkgDetails
).filter(([dir, pkgJson]) => !pkgJson.private)
  .map(pkgToMdRow)
  .join("\n")}\n\n`;

// Find workflow files in .github/workflows directory
const workflowDir = path.join(repoRootDir, ".github", "workflows");
const workflowFiles = fs.readdirSync(workflowDir).filter(file => file.endsWith('.yml'));

// Add workflow files to workflowBadges object
const workflowBadges = workflowFiles.map((file) => {
  const badgeLink = `https://github.com/jackcarey/web-components/actions/workflows/${file}/badge.svg?branch=main`;
  const runLink = `https://github.com/jackcarey/web-components/actions/workflows/${file}?query=branch%3Amain)`;
  return `[![${file} workflow](${badgeLink})](${runLink})`;
});

const replacements = {
  $count: count,
  $table: mdBody,
  $workflowBadges: workflowBadges.join("\n"),
};

const readmeContent = Object.entries(replacements).reduce(
  (acc, [key, value]) => acc.replaceAll(key, value),
  template
);
const readmePath = path.join(repoRootDir, "README.md");
const exists = fs.existsSync(readmePath);
const contentChanged = !exists || fs.readFileSync(readmePath, "utf8") !== readmeContent;
if (contentChanged) {
  fs.writeFileSync(readmePath, readmeContent);
  console.log(`README.md ${exists ? 'updated' : 'created'} at ${repoRootDir}`);
} else {
  console.log(`No changes to README.md at ${repoRootDir}`);
}