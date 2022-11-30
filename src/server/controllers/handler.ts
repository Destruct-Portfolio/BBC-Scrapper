/** @format */
import { Json_getter } from "../../app/cors/db_getter.js";
import { Handler, Request, response, Response } from "express";

class Handlers {
  public static async index(req: Request, res: Response, next: Handler) {
    const { date } = req.body;
    if (!date) {
      res.json({ reports: "Please Provide a date" });
    } else {
      let Files = await new Json_getter().GetFile(date);
      console.log(Files);
      res.json({
        reports: Files,
      });
    }
  }

  public static default(req: any, res: any, next: any): any {
    res.status(404).send("NOT FOUND.");
  }
}

export default Handlers;
