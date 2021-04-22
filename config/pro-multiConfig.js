const { srcPath, getDirNames } = require("./utils/util");
const defaultConfig = require("./pro-defaultConfig");
const { each } = require("lodash");
const multiConfig = {
  entry: () =>
    new Promise(resolve => {
      const dir = getDirNames(srcPath);
      // 为了代码的健壮性 需要判断子目录中是否有index.js文件
      dir.then(res => {
        let dirObj = {};
        each(res, item => {
          dirObj[`${item}/index`] = `./src/${item}/index.js`;
        });
        resolve({
          index: "./src/index.js",
          ...dirObj
        });
      });
    }),
  output: {
    ...defaultConfig.output,
    filename: pathData => {
      const { runtime } = pathData;
      const nameList = runtime.split("/");
      if (nameList.length > 1) {
        return `${nameList[0]}/${nameList[1]}.js`;
      }
      return "[name].js";
    }
  }
};
module.exports = multiConfig;
