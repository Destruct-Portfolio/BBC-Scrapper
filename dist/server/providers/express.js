import express from "express";
import Locals from "./local.js";
import Routes from "./router.js";
import bootstrap from "../middlewares/kernel.js";
class Express {
    express;
    constructor() {
        this.express = express();
        this.mountEnv();
        this.mountMiddlewares();
        this.mountApi();
    }
    mountEnv() {
        this.express = Locals.init(this.express);
    }
    mountApi() {
        console.log("Routes Mounted");
        this.express = Routes.MountApi(this.express);
    }
    mountMiddlewares() {
        this.express = bootstrap.init(this.express);
    }
    init() {
        const port = Locals.config().PORT;
        this.express
            .listen(port, () => {
            return console.log("\x1b[33m%s\x1b[0m", `Server :: Running @ http://localhost:${port}`);
        })
            .on("error", (_err) => {
            return console.log("Error: ", _err.message);
        });
    }
}
export default new Express();
