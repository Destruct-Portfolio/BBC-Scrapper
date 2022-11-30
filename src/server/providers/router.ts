/** @format */

import { Application } from "express";
import Log from "../middlewares/log.js";
import router from "../routes/route.js";
import Locals from "./local.js";

class Routes {
  public MountApi(_express: Application): Application {
    Log.info("Routes :: Mounting API Routes...");
    return _express.use(`/${Locals.config().API_PREFIX}`, router);
  }
}

export default new Routes();
