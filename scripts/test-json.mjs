import fs from "fs";
import { exec } from "child_process";

exec("jest --json", (_error, stdout, stderr) => {
  //Save test results
  fs.writeFileSync("test-output/results.json", JSON.stringify(stdout, null, 2));
  console.log("Saved test results to jest-results.json");

  // Save other messages and errors
  if (stderr) {
    fs.writeFileSync("test-output/errors.log", stderr);
    console.log("Saved error log to jest-errors.log");
  }
});
