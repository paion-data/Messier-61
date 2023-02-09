import path from "path"
import nanoid from "nanoid"
import DateTime from "luxon"
import config from "./core/config"

let MESSIER_61 = {
  IS_DEBUG: process.env.NODE_ENV === "development",
  IS_MASTER: true
  ROOTPATH: process.cwd(),
  INSTANCE_ID: nanoid(10),
  SERVERPATH: path.join(process.cwd(), "server"),
  config: config
}

MESSIER_61.config.init();

global.MESSIER_61 = MESSIER_61;