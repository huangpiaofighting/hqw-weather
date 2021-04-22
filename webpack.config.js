const devConfig = require("./config/dev-webpack.js");
const proConfig = require("./config/pro-webpack.js");

module.exports = (env, argv) => {
  if (argv.mode === "development") {
    return devConfig;
  } else if (argv.mode === "production") {
    return proConfig;
  }
  return devConfig;
};

/* 
import config from './config/webpack'

export default config;
这种import 在webpack 上是不识别的 用 require module.export 使用的是node里commonJs模块

如果要配置react(jsx)就要安装babel和babel preset-react
*/
