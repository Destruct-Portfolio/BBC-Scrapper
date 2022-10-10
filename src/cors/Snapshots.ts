import fs from "fs";
import { Inews } from "../types";
import lodash from "lodash";
import Logger from "../misc/logger.js";

export class Snapshots {
  private _data: Inews[];

  private Today: string;

  private logger: Logger;

  private outputPath: string;

  constructor(Data: Inews[]) {
    this._data = Data;

    this.logger = new Logger("snapshot", "snapshots");

    this.Today = new Date().toDateString().replace(/ /g, "_");

    this.outputPath = "../output";
  }

  private async verify_folders() {
    let files = await fs.readdirSync(this.outputPath);

    let exists: string[] | boolean = files.filter((item) => {
      if (item == `${this.Today}.json`) {
        return item;
      }
    });

    return exists;
  }

  private async writeData(data: Inews[]) {
    this.logger.info("Writing new items in the file");

    fs.writeFile(
      `${this.outputPath}/${this.Today}.json`,

      JSON.stringify(data),
      { encoding: "utf-8" },

      (err) => {
        if (err) this.logger.error(`writeData >> `);

        console.log(err);
      }
    );
  }

  private async load_verify_data(FileName: string) {
    this.logger.info("Loading OlD snap ... ");

    let oldsnap = JSON.parse(
      fs.readFileSync(`${this.outputPath}/${FileName}`, {
        encoding: "utf-8",
      })
    );
    this.logger.info(
      "Geting diffrance between The Old Snap and the new one ... "
    );
    let diff = lodash.differenceBy(this._data, oldsnap, "link");

    if (diff.length > 0) {
      this.logger.info("a new Arritcle comme up");

      diff.forEach((item) => {
        this._data.push(item);
      });

      await this.writeData(this._data);
    } else {
      this.logger.info("No New Article ... Until Next Time ");
    }
  }

  public async _exec() {
    this.logger.info("Starting snaping ...");

    this.logger.info("Verify IF files of today exists");
    let exists = await this.verify_folders();

    if (exists.length > 0) {
      this.logger.info("File Exists");

      await this.load_verify_data(exists[0]);
      return "DONE ... ";
    } else {
      this.logger.info("File Does Not exists");

      await this.writeData(this._data);

      return "DONE ... ";
    }
  }
}
