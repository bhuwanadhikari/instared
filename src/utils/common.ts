const fs = require("fs");
const path = require("path");

export const delay = (t: number) => new Promise((resolve) => setTimeout(resolve, t));

export function getAppRootDir() {
  let currentDir = __dirname;
  while (!fs.existsSync(path.join(currentDir, "package.json"))) {
    currentDir = path.join(currentDir, "..");
  }
  return currentDir;
}
