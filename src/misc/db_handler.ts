import fs from "fs";
import Logger from "./logger.js";

class Folders_manager {
  private logger: Logger;

  private path: string;

  constructor() {
    this.logger = new Logger("Folder_manager", "Folder_manager");

    this.path = "./DB";
  }

  //This will create Folders Depending on the Scripts we have
  /* 
    TODO See the Folders we allready have 
    TODO See the Scripts we allready have 
    TODO compare the Following Two 
    TODO Create if something is not there 
  */
  public async Create_Folders() {
    let DB_Folder = await fs.readdirSync(this.path);
    console.log(DB_Folder);
  }
}

console.log(await new Folders_manager().Create_Folders());
