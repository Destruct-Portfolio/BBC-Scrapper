import FT_scrapper from "../components/ft_scrapper.js";
import Save from "./save.js";
export class Handler {
    static scrapers = [
        /*     Ny_Times,
            Washington, */
        FT_scrapper,
        /*   BBC,
          BloombergNewsScrapper,
          TheGuardian */
    ];
    static async Start() {
        let t = [];
        try {
            for (const scraper of Handler.scrapers) {
                let data = await new scraper().exec();
                t.push(data);
            }
            console.log('Saving Data');
            Save.SaveFile(t);
        }
        catch (error) {
            console.log(error);
        }
    }
}
