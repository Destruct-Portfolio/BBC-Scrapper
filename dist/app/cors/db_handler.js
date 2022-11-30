import fs from "node:fs";
import lodash from "lodash";
import Logger from "../misc/logger.js";
export class DB_Handler {
    Today;
    logger;
    outputPath;
    data;
    constructor(Data) {
        this.data = Data;
        //Replace the snapshot session with a date or hour
        this.logger = new Logger("db_handler", "snapshot");
        this.Today = new Date().toDateString().replace(/ /g, "_");
        this.outputPath = "../bank";
    }
    async verify_folders() {
        let Files = await fs.readdirSync(this.outputPath);
        console.log(Files);
        let exists = Files.filter((item) => {
            if (item == `${this.Today}.json`) {
                return item;
            }
        });
        return exists;
    }
    async WriteData(data) {
        fs.writeFile(`${this.outputPath}/${this.Today}.json`, JSON.stringify(data), { encoding: "utf-8" }, (err) => {
            if (err)
                this.logger.error("writeData");
            console.log(err);
        });
    }
    async load_verify_data(FileName) {
        this.logger.info("Loading Pressent Data");
        let oldsnap = JSON.parse(fs.readFileSync(`${this.outputPath}/${FileName}`, {
            encoding: "utf-8",
        }));
        let diff = lodash.isEqual(this.data, oldsnap);
        if (diff === false) {
            this.logger.info("New Articles Detected ... ");
        }
        else {
        }
    }
    async _exec() {
        console.log(this.Today);
        this.logger.info("Starting snaping ...");
        this.logger.info("Verify IF files of today exists");
        let exists = await this.verify_folders();
        console.log(exists);
        if (exists.length > 0) {
            this.logger.info("File Exists");
            await this.load_verify_data(exists[0]);
            return "DONE ... ";
        }
        else {
            this.logger.info("File Does Not exists");
            await this.WriteData(this.data);
            return "DONE ... ";
        }
    }
}
