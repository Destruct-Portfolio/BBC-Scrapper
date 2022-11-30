import fs from "node:fs";
export class Json_getter {
    outputpath;
    constructor() {
        this.outputpath = "../bank";
    }
    async GetFile(date) {
        let frr = await fs.readFileSync(`${this.outputpath}/${date}`);
        let data = JSON.parse(frr.toString());
        return data;
    }
}
