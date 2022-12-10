/** @format */
import { Json_getter } from "../../app/cors/db_getter.js";
import { Handler, Request, response, Response } from "express";
import Logger from "../../app/misc/logger.js";

let Logg = new Logger("helke", "jtelj");
class Handlers {
  public static async index(req: Request, res: Response, next: Handler) {
    const { date } = req.body;
    if (!date) {
      res.json({ reports: "Please Provide a date" });
    } else {
      try {
        let Files = await new Json_getter().GetFile(date);

        Logg.info(
          "A New Requiest MAde From :: params " + date + " from ::" + req.ip
        );

        res.json({
          reports: Files,
        });
      } catch (error) {
        Logg.error("Failed Request With :: params " + date);

        res.status(500).json({ msg: "This Date is not recorded.", date });
      }
    }
  }

  public static async single(req: Request, res: Response, next: Handler) {
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
    } else {
      try {
        let Files = await new Json_getter().GetFile(date);
        console.log(Files.webiste);
      } catch (error) {
        Logg.error("Failed Request With :: params " + date);
        res.status(500).json({ msg: "This Date is not recorded.", date });
      }
    }
  }

  public static default(req: any, res: any, next: any): any {
    res.status(404).send("NOT FOUND.");
  }
}

export default Handlers;
