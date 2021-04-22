const fs = require("fs");
const path = require("path");

const srcPath = path.resolve(__dirname, "../../src");

async function getDirNames(path) {
  const dir = await fs.promises.opendir(path);
  let directoryNames = [];
  for await (const dirent of dir) {
    if (dirent.isDirectory()) {
      directoryNames.push(dirent.name);
    }
  }
  return directoryNames;
}

module.exports = {
  srcPath,
  getDirNames,
};
