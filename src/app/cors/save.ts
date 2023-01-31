import fs from "node:fs"
import { JsonFile } from "../types";

export default class Save {
    public static SaveFile(Data: any) {
        let Today = new Date().toDateString().replace(/ /g, "_");
        let path = "../bank";

        let ReadDir = fs.readdirSync(path).filter((File) => {
            if (File == Today) return File
        })
        if (ReadDir.length > 0) {
            // file allready exists
            console.log('File Allready Created')
            try {
                fs.writeFileSync(`${path}/${ReadDir[0]}`, JSON.stringify(Data))
            } catch (error) {
                console.log(error)
            }
        } else {
            // file do no exists
            console.log('File Do not Exists')
            try {
                fs.writeFileSync(`${path}/${Today}.json`, JSON.stringify(Data), { flag: "a" })
            } catch (error) {
                console.log(error)

            }
        }
    }
}
