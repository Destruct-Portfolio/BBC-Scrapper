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
        let Files = await Json_getter.GetFile(date);

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
        reports: "Please provide the needed params",
        example: {
          data: "Thu_Nov_24_2022",
          webiste: ["Bbc_News", "FT_News", "Guardian_News"],
        },
      });
    } else {
      try {
        let Files = await Json_getter.GetFile(date);
        console.log(Files.webiste);
      } catch (error) {
        console.log(error)
        Logg.error("Failed Request With :: params " + date);
        res.status(500).json({ msg: "This Date is not recorded.", date });
      }
    }
  }
  public static async By_Month(req: Request, res: Response, next: Handler) {
    const { month, Page } = req.body
    if (!month) {
      Logg.error(`Request Made but failed , missing params ...`)
      res.json({
        reports: "Please provide the needed params",
        example: {
          month: "Nov",
        },
      })
    } else {
      try {
        Logg.info(`Request Made With Params :: ${month}`)
        let Files = Json_getter.GetMonthlyFile(month)
        console.log(Files)

        res.json({
          reports: Files,
        })
      } catch (error) {
        Logg.error("Failed Request With :: params " + month);
        res.status(500).json({ msg: "This Date is not recorded.", month });
      }
    }

  }

  public static async LastWeek(req: Request, res: Response, next: Handler) {

    try {
      let files = await Json_getter.GetLastWeek()
      res.json({
        reports: files,
        number_of_days: files.length
      }).status(200)
    } catch (error: any) {
      res.json({
        reports: [],
        Failed: error.status
      }).status(500)
    }
  }

  public static Days(req: Request, res: Response, next: Handler) {
    const { StartFrom, numberOfDays } = req.body
    if (!StartFrom || !numberOfDays) {
      res.json({
        reports: "Please provide the needed params",
        example: {
          StartFrom: "Thu_Nov_24_2022",
          numberOfDays: 4
        },
      }).status(500)
    } else {
      res.json({ reports: Json_getter.GetBy_NumberOfDays(StartFrom, numberOfDays) })
    }


  }

  public static default(req: any, res: any, next: any): any {
    res.status(404).send("NOT FOUND.");
  }
}

export default Handlers;
