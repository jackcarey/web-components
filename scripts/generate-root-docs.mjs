import fs from "fs";
import path from "path";
import { repoRootDir, pkgDetails, count } from "./util-packages.mjs";

console.log("compiling packages for root readme and html from:", repoRootDir);

const mdTemplate = fs.readFileSync(
  path.join(repoRootDir, "doc-templates", "root-readme.md"),
  "utf8"
);

const htmlTemplate = fs.readFileSync(
  path.join(repoRootDir, "doc-templates", "root-index.html"),
  "utf8"
);

const generateLink = (pkgJson, type = "repo") => {
  switch (type) {
    case "repo":
      return {
        name: pkgJson.name,
        url: "https://github.com/jackcarey/web-components"
      };
    case "src":
      return {
        name: pkgJson.name,
        url: `https://github.com/jackcarey/web-components/tree/main/packages/${pkgJson.name}`
      };
    case "license":
      return {
        name: pkgJson.license,
        url: `https://www.tldrlegal.com/search?query=${encodeURIComponent(
          pkgJson.license
        )}`,
      };
    case "jsr":
      return {
        name: pkgJson.name,
        url: `https://jsr.io/@web-components/${pkgJson.name}`,
      };
    case "jsr-badge":
      return {
        name: pkgJson.name,
        url: `https://jsr.io/badges/@web-components/${pkgJson.name}`,
      };
    case "jsr-score":
      return {
        name: pkgJson.name,
        url: `https://jsr.io/@web-components/${pkgJson.name}/score`,
      };
    case "jsr-score-badge":
      return {
        name: pkgJson.name,
        url: `https://jsr.io/badges/@web-components/${pkgJson.name}/score`,
      };
    default:
      return {};
  }
};

const pkgDescription = (pkgJson, mode = "html") => {
  const type = pkgJson?.name?.includes("-") ? "Component" : "Utility";
  const formattedType = mode === "html" ? `<p><i>${type}</i></p>` : ` - *${type}*`;
  const formattedDesc = mode === "html" ? `<p>${pkgJson?.description}</p>` : `${pkgJson?.description}`;
  return `${formattedDesc}${formattedType}`.trim();
};

const workflowLink = (file, mode = "html") => {
  const badgeLink = `https://github.com/jackcarey/web-components/actions/workflows/${file}/badge.svg?branch=main`;
  const runLink = `https://github.com/jackcarey/web-components/actions/workflows/${file}?query=branch%3Amain`;
  return mode === "html" ? `<a href="${runLink}"><img src="${badgeLink}" target="_blank" alt="${file} workflow"></a>` : `[![${file} workflow](${badgeLink})](${runLink})`;
};

const pkgToMd = (pkgJson) => {
  const name = pkgJson?.name ?? "-";
  const srcLink = generateLink(pkgJson, "src");
  const srcMd = `[${name}](${srcLink.url})`;
  const description = pkgDescription(pkgJson, "md");
  const version = pkgJson?.version ?? "-";
  const licenseName = pkgJson?.license ?? "unlicensed";
  const licenseMd = `[${licenseName}](${generateLink(pkgJson, "license", licenseName).url})`;
  const { url: jsrLinkUrl } = generateLink(pkgJson, "jsr");
  const { url: jsrBadgeUrl } = generateLink(pkgJson, "jsr-badge");
  const { url: jsrScoreUrl } = generateLink(pkgJson, "jsr-score");
  const { url: jsrScoreBadgeUrl } = generateLink(pkgJson, "jsr-score-badge");
  const jsrVersionBadgeMd = `[![${name}](${jsrBadgeUrl})](${jsrLinkUrl})`;
  const jsrScoreMd = `[![${name} score](${jsrScoreBadgeUrl})](${jsrScoreUrl})`;
  return `| ${srcMd} | ${description} | ${version} | ${licenseMd} | ${jsrVersionBadgeMd} ${jsrScoreMd} | `;
};

const pkgToHtml = (pkgJson) => {
  const name = pkgJson?.name ?? "-";
  const storybookHtml = `<a href="/storybook-static/?path=/docs/${name}" target="_blank">${name}</a>`;
  const srcLink = generateLink(pkgJson, "src");
  const srcHtml = `<a href="${srcLink.url}" target="_blank">src</a>`;
  const description = pkgDescription(pkgJson, "html");
  const version = pkgJson?.version ?? "-";
  const licenseName = pkgJson?.license ?? "unlicensed";
  const licenseHtml = `<a href="${generateLink(pkgJson, "license", licenseName).url}">${licenseName}</a>`;
  const { url: jsrLinkUrl } = generateLink(pkgJson, "jsr");
  const { url: jsrBadgeUrl } = generateLink(pkgJson, "jsr-badge");
  const { url: jsrScoreUrl } = generateLink(pkgJson, "jsr-score");
  const { url: jsrScoreBadgeUrl } = generateLink(pkgJson, "jsr-score-badge");
  const jsrVersionBadgeHtml = `<a href="${jsrLinkUrl}" target="_blank"><img src="${jsrBadgeUrl}" alt="${name}"/></a>`;
  const jsrScoreHtml = `<a href="${jsrScoreUrl}"><img src="${jsrScoreBadgeUrl}" alt="${name} JSR score"/></a>`;
  return `<tr><td>${storybookHtml}<br/>(${srcHtml})</td><td>${description}</td><td>${version}</td><td>${licenseHtml}</td><td>${jsrVersionBadgeHtml} ${jsrScoreHtml}</td></tr>`;
};


// Generate the markdown content for the README
const mdBody = `| Name | Description | Version | License | Registry |\n | --- | --- | --- | --- | --- |\n${Object.values(
  pkgDetails
)
  .map(pkgToMd)
  .join("\n")
  } \n\n`;
const htmlBody = `<table><thead><tr><th>Name</th><th>Description</th><th>Version</th><th>License</th><th>Registry</th></tr></thead><tbody>${Object.values(
  pkgDetails
)
  .map(pkgToHtml)
  .join("\n")
  }</tbody></table>`;


// Find workflow files in .github/workflows directory
const workflowDir = path.join(repoRootDir, ".github", "workflows");
const workflowFiles = fs.readdirSync(workflowDir).filter(file => file.endsWith('.yml'));

// Add workflow files to workflowBadges object
const workflowMdBadges = workflowFiles.map(file => workflowLink(file, "md"));
const workflowHtmlBadges = workflowFiles.map(file => workflowLink(file, "html"));

const mdReplacements = {
  $count: count,
  $table: mdBody,
  $workflowBadges: workflowMdBadges.join("\n"),
};

const htmlReplacements = {
  $count: count,
  $table: htmlBody,
  $workflowBadges: workflowHtmlBadges.join("\n"),
};

const readmeContent = Object.entries(mdReplacements).reduce(
  (acc, [key, value]) => acc.replaceAll(key, value),
  mdTemplate
);
const htmlContent = Object.entries(htmlReplacements).reduce(
  (acc, [key, value]) => acc.replaceAll(key, value),
  htmlTemplate
);

const readmePath = path.join(repoRootDir, "README.md");
if (
  !fs.existsSync(readmePath) ||
  fs.readFileSync(readmePath, "utf8") !== readmeContent
) {
  fs.writeFileSync(readmePath, readmeContent);
  console.log(`README.md updated at ${repoRootDir}`);
} else {
  console.log(`No changes to README.md at ${repoRootDir}`);
}

const htmlPath = path.join(repoRootDir, "index.html");
if (
  !fs.existsSync(htmlPath) ||
  fs.readFileSync(htmlPath, "utf8") !== htmlContent
) {
  fs.writeFileSync(htmlPath, htmlContent);
  console.log(`index.html updated at ${repoRootDir}`);
} else {
  console.log(`No changes to index.html at ${repoRootDir}`);
}
