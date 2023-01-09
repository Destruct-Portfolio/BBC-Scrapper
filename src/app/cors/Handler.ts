import BBC from "../components/bbc_scrapper.js";
import FT_scrapper from "../components/ft_scrapper.js";
import TheGuardian from "../components/guardian.js";
import Ny_Times from "../components/ny_times.js";
import { DB_Handler } from "./db_handler.js";
import Washington from "../components/washington.js";
import BloombergNewsScrapper from "../components/bloomberg.js";

import { Inews, JsonFile } from "../types/index.js";

export class Handler {
  //private logger: Logger;
  private static scrapers = [
    BBC,
    FT_scrapper,
    TheGuardian,
    Ny_Times,
    Washington,
    BloombergNewsScrapper
  ]

  /*   private static payload = [
      BBC: [] = []
    ] */


  public static async Start() {
    let Scrapers: JsonFile[] = []
    try {
      for (const scraper of Handler.scrapers) {
        let data = await new scraper().exec()
        Scrapers[`${scraper}`]
      }

    } catch (error) {
      console.log(error)
    }
  }

}
