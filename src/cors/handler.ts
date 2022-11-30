import { BBC } from "../componants/bbc_scrapper.js";
import { FT_scrapper } from "../componants/ft_scrapper.js";
import { TheGuardian } from "../componants/the_guardian.js";

export class Handler {
  /* 
  ! This class is responsable for lunching and gathering all the data in the scrappers and Downloading them in json file
  */

  private BBCScraper: BBC;
  private FT_Scrapper: FT_scrapper;
  private TheGuardian: TheGuardian;

  constructor() {
    this.BBCScraper = new BBC();
    this.FT_Scrapper = new FT_scrapper();
    this.TheGuardian = new TheGuardian();
  }

  private setup() {}

  public async exec() {
    let bbc = await this.BBCScraper._exec();

    let FT_Scrapper = await this.FT_Scrapper._exec();

    console.log("--------------------- BBC-----------------");

    console.log(bbc);

    console.log("----------------------FT-------------------");

    console.log(FT_Scrapper);
  }
}
