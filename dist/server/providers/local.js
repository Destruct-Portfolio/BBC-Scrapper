import dotenv from "dotenv";
import path from "path";
class Locals {
    static config() {
        const dirname = path.dirname("../.env");
        dotenv.config({ path: path.join(dirname, "/.env") });
        const PORT = process.env.SERVER_PORT || 3000;
        const HOST = process.env.SERVER_HOST || "http://localhost:";
        const API_PREFIX = process.env.API_PREFIX || "api/v1";
        return {
            PORT,
            HOST,
            API_PREFIX,
        };
    }
    static init(_express) {
        _express.locals.app = this.config();
        return _express;
    }
}
export default Locals;
