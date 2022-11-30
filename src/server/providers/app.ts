import Express from "./express.js";
import dotenv from "dotenv";
import path from "path";

class App {
  public ClearConsole(): void {
    process.stdout.write("\x1B[2J\x1B[0f");
  }
  public LoadConfiguration(): void {
    const dirname = path.dirname("../.env");
    console.log("configuration :: Booting @ Server");

    dotenv.config({ path: path.join(dirname) });
  }
  public LoadServer(): void {
    console.log("server :: Booting @ Server");
    Express.init();
  }
}

export default new App();
