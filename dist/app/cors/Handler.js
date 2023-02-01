import TheGuardian from "../components/guardian.js";
import Save from "./save.js";
export class Handler {
    static scrapers = [
        TheGuardian,
        /* FT_scrapper,
        BBC,
        Ny_Times,
        Washington,
        BloombergNewsScrapper */
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
