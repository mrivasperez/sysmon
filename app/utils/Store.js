// This file gives the application the ability to save user settings.

const electron = require("electron"),
  path = require("path"),
  fs = require("fs");

class Store {
  constructor(options) {
    //   set user data path
    const userDataPath = (electron.app || electron.remote.app).getPath(
      "userData"
    );
    // create file at user data path and create json file with config name from main.js
    this.path = path.join(userDataPath, options.configName + ".json");
    this.data = parseDataFile(this.path, options.defaults);
  }

  get(key) {
    return this.data[key];
  }

  set(key, val) {
    this.data[key] = val;
    fs.writeFileSync(this.path, JSON.stringify(this.data));
  }
}

function parseDataFile(filePath, defaults) {
  try {
    return JSON.parse(fs.readFileSync(filePath));
  } catch (error) {
    return defaults;
  }
}

module.exports = Store;
