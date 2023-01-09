import fs from "node:fs";
export class Json_getter {
    outputpath;
    constructor() {
        this.outputpath = "./bank";
    }
    async GetFile(date) {
        let t = date.toUpperCase();
        let frr = await fs.readFileSync(`${this.outputpath}/${t}.json`);
        let data = JSON.parse(frr.toString());
        return data;
    }
}
