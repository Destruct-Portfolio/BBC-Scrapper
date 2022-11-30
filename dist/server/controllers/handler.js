/** @format */
import { Json_getter } from "../../app/cors/db_getter.js";
class Handlers {
    static async index(req, res, next) {
        const { date } = req.body;
        if (!date) {
            res.json({ reports: "Please Provide a date" });
        }
        else {
            let Files = await new Json_getter().GetFile(date);
            console.log(Files);
            res.json({
                reports: Files,
            });
        }
    }
    static default(req, res, next) {
        res.status(404).send("NOT FOUND.");
    }
}
export default Handlers;
