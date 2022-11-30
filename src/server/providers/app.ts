/** @format */
import Log from "../middlewares/log.js";
import Express from "./express.js";
import dotenv from "dotenv";
import path from "path";

class App {
  public ClearConsole(): void {
    process.stdout.write("\x1B[2J\x1B[0f");
  }
  public LoadConfiguration(): void {
    const dirname = path.dirname("../.env");
    Log.info("Configuration :: Booting @ Server...");
    dotenv.config({ path: path.join(dirname) });
  }
  public LoadServer(): void {
    Log.info("server :: Booting @ Server");
    Express.init();
  }
}

export default new App();
