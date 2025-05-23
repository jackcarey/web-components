import fs from "fs";
import path from "path";
import { repoRootDir, pkgDetails, getBadges } from "./util-packages.mjs";

console.log("generating package readmes from...");

let changedPkgCount = 0;
const template = fs.readFileSync(
  path.join(repoRootDir, "doc-templates", "pkg-readme.md"),
  "utf8"
);

Object.entries(pkgDetails).forEach(([dir, pkgJson]) => {
  const readmePath = path.join(dir, "README.md");
  const docsPath = path.join(dir, "DOCUMENTATION.md");
  let docsStr = '';
  if (fs.existsSync(docsPath)) {
    docsStr = fs.readFileSync(docsPath, "utf8");
    if (docsStr?.length === 0) {
      docsStr = `See repo: [jackcarey/web-components](https://github.com/jackcarey/web-components)`;
    }
  }
  const replacements = {
    $name: pkgJson.name,
    $version: pkgJson.version,
    $description: `> ${pkgJson.description ?? pkgJson.name}`,
    $license: pkgJson.license ?? "unlicensed",
    $encodedLicense: encodeURIComponent(pkgJson.license) ?? "",
    $docs: docsStr,
    $badges: getBadges(pkgJson.name),
    $storybookLink: `https://jackcarey.co.uk/web-components/storybook-static/?path=/docs/${pkgJson.name.includes('-')?'components':'utilities'}-${pkgJson.name}`
  };
  const readmeContent = Object.entries(replacements).reduce(
    (acc, [key, value]) => acc.replaceAll(key, value),
    template
  );
  const fileExists = fs.existsSync(readmePath);
  if (
    !fileExists ||
    fs.readFileSync(readmePath, "utf8") !== readmeContent
  ) {
    fs.writeFileSync(readmePath, readmeContent);
    changedPkgCount++;
    console.log(`README.md ${fileExists ? "updated" : "created"} at ${dir}`);
  } else {
    console.log(`No changes to README.md at ${dir}`);
  }
});

console.log(changedPkgCount + " package details saved to README files");
