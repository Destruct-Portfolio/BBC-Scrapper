/** @format */
import { Json_getter } from "../../app/cors/db_getter.js";
import Logger from "../../app/misc/logger.js";
let Logg = new Logger("helke", "jtelj");
class Handlers {
    static async index(req, res, next) {
        const { date } = req.body;
        if (!date) {
            res.json({ reports: "Please Provide a date" });
        }
        else {
            try {
                let Files = await new Json_getter().GetFile(date);
                Logg.info("A New Requiest MAde From :: params " + date + " from ::" + req.ip);
                res.json({
                    reports: Files,
                });
            }
            catch (error) {
                Logg.error("Failed Request With :: params " + date);
                res.status(500).json({ msg: "This Date is not recorded.", date });
            }
        }
    }
    static async single(req, res, next) {
        // make the error a better Way
        const { date, website } = req.body;
        if (!date || !website) {
            res.json({
                resport: "Please provide the needed params",
                example: {
                    data: "Thu_Nov_24_2022",
                    webiste: ["Bbc_News", "FT_News", "Guardian_News"],
                },
            });
        }
        else {
            try {
                let Files = await new Json_getter().GetFile(date);
                console.log(Files.webiste);
            }
            catch (error) {
                Logg.error("Failed Request With :: params " + date);
                res.status(500).json({ msg: "This Date is not recorded.", date });
            }
        }
    }
    static default(req, res, next) {
        res.status(404).send("NOT FOUND.");
    }
}
export default Handlers;
