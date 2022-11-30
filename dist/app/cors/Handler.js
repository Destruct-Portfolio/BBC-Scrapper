import { BBC } from "../components/bbc_scrapper.js";
import { FT_scrapper } from "../components/ft_scrapper.js";
import { TheGuardian } from "../components/guardian.js";
export class Handler {
    //private logger: Logger;
    BBC_scrapper;
    FT_scrapper;
    Guardian_scrapper;
    payload;
    constructor() {
        this.BBC_scrapper = new BBC();
        this.FT_scrapper = new FT_scrapper();
        this.Guardian_scrapper = new TheGuardian();
        this.payload = {
            Bbc_News: [],
            FT_News: [],
            Guardian_News: [],
        };
    }
    async execute() {
        try {
            const BBC = await this.BBC_scrapper._exec();
            console.log("---------------BBC-------------");
            //console.log(BBC);
            this.payload.Bbc_News = BBC;
            const FT_scrapper = await this.FT_scrapper._exec();
            console.log("---------------FT-------------");
            //console.log(FT_scrapper);
            this.payload.FT_News = FT_scrapper;
            const TheGuardian = await this.Guardian_scrapper.exec();
            console.log("-----------Guardian----------");
            //console.log(TheGuardian);
            this.payload.Guardian_News = TheGuardian;
            return this.payload;
        }
        catch (error) {
            console.log(error);
        }
    }
}
