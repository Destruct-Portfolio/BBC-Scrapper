import fs from "node:fs";

export class Json_getter {
  private outputpath: string;

  constructor() {
    this.outputpath = "./bank";
  }

  public async GetFile(date: string) {
    let t = date.toUpperCase();
    let frr = await fs.readFileSync(`${this.outputpath}/${t}.json`);
    let data = JSON.parse(frr.toString());
    return data;
  }

  /*   public async GetMultipleJsonData(dates: string[]) {
    let data = [];
    for (let index = 0; index < dates.length; index++) {
      const element = dates[index];
      let frr = await fs.readFileSync(`${this.outputpath}/${dates[index]}`);
      let data = JSON.parse(frr.toString());
        
    }
  } */
}
