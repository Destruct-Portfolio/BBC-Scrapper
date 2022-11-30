import Express from "./express.js";
import dotenv from "dotenv";
import path from "path";
class App {
    ClearConsole() {
        process.stdout.write("\x1B[2J\x1B[0f");
    }
    LoadConfiguration() {
        const dirname = path.dirname("../.env");
        console.log("configuration :: Booting @ Server");
        dotenv.config({ path: path.join(dirname) });
    }
    LoadServer() {
        console.log("server :: Booting @ Server");
        Express.init();
    }
}
export default new App();
