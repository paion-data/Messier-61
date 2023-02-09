import path from "path"

let indexModule;
jest.isolateModules(() => {
  indexModule = require('../index.js');
});

const indexModule2 = require('../index.js');

function init() {
  let configSources = {
    configFile: path.join(MESSIER_61.ROOTPATH, "config.yml")
  }
}

export { init };
