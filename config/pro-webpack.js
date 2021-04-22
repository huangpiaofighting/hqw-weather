const currentProjectConfig = require("./config");
const defaultConfig = require("./pro-defaultConfig");
const otherConfig = require("./pro-multiConfig");

let config = defaultConfig;
if (currentProjectConfig.isMultiEntry) {
  config = { ...defaultConfig, ...otherConfig };
}

module.exports = config;
