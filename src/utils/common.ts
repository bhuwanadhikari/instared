import fs from "fs";
import path from "path";

export const delay = (t: number) =>
  new Promise((resolve) => setTimeout(resolve, t));

// export const saveLongLivedToken = (token: string) => {
//   const jsonContent = { token };
//   fs.writeFileSync("token.json", JSON.stringify(jsonContent), "utf8");
// };

// export const readLongLivedToken = () => {
//   const raw = fs.readFileSync("token.json");
//   return JSON.parse(raw.content.toString);
// };

export function getAppRootDir() {
  let currentDir = __dirname;
  while (!fs.existsSync(path.join(currentDir, "package.json"))) {
    currentDir = path.join(currentDir, "..");
  }
  return currentDir;
}
