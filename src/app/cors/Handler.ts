import BBC from "../components/bbc_scrapper.js";
import FT_scrapper from "../components/ft_scrapper.js";
import TheGuardian from "../components/guardian.js";
import Ny_Times from "../components/ny_times.js";
import Washington from "../components/washington.js";
import BloombergNewsScrapper from "../components/bloomberg.js";

import { Inews, JsonFile } from "../types/index.js";
import Save from "./save.js";

export class Handler {

  private static scrapers = [
    Ny_Times,
    Washington,
    FT_scrapper,
    BBC,
    BloombergNewsScrapper,
    TheGuardian
  ]


  public static async Start() {
    let t = []
    try {
      for (const scraper of Handler.scrapers) {
        let data = await new scraper().exec()
        t.push(data)
      }
      console.log('Saving Data')
      Save.SaveFile(t)
    } catch (error) {
      console.log(error)
    }
  }

}
