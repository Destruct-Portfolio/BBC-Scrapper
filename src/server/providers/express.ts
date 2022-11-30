/** @format */
import express from "express";
import Locals from "./local.js";
import Routes from "./router.js";
import bootstrap from "../middlewares/kernel.js";
class Express {
  public express: express.Application;
  constructor() {
    this.express = express();
    this.mountEnv();
    this.mountMiddlewares();
    this.mountApi();
  }
  private mountEnv(): void {
    this.express = Locals.init(this.express);
  }
  private mountApi(): void {
    console.log("Routes Mounted");
    this.express = Routes.MountApi(this.express);
  }
  private mountMiddlewares(): void {
    this.express = bootstrap.init(this.express);
  }
  public init(): any {
    const port: number = Locals.config().PORT;
    this.express
      .listen(port, () => {
        return console.log(
          "\x1b[33m%s\x1b[0m",
          `Server :: Running @ http://localhost:${port}`
        );
      })
      .on("error", (_err) => {
        return console.log("Error: ", _err.message);
      });
  }
}

export default new Express();
