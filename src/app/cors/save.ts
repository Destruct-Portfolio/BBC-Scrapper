import fs from "node:fs"
import { JsonFile } from "../types";

export default class Save {
    public static SaveFile(Data: JsonFile[]) {
        let Today = new Date().toDateString().replace(/ /g, "_");
        let path = "../bank";

        let ReadDir = fs.readdirSync(path).filter((File) => {
            if (File == Today) return File
        })
        if (ReadDir.length > 0) {
            try {
                fs.writeFileSync(`${path}/${ReadDir[0]}`, JSON.stringify(Data))
            } catch (error) {
                console.log("Saving Handler Failed To Load")
                console.log(error)
            }
        } else {
            try {
                fs.writeFileSync(`${path}/${Today}.json`, JSON.stringify(Data))
            } catch (error) {
                console.log(error)

            }
            console.log('We need to create a new File')
        }
    }
}
