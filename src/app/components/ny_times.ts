import { Inews } from "../types"
import axios from "axios"
import Save from "../cors/save.js"
import moment from "moment";
import Logger from "../misc/logger.js";

export default class Ny_Times {
    private APIKEY: string
    private source: string
    private payload: Inews[]
    private logger: Logger

    SectionsToIgnore = [
        "world cup",
        "opinion",
        "weather",
        "spots",
        "briefing",
        "cooking",
        "games",
        "arts",
        "crosswords",
        "style",
    ]

    constructor() {
        this.APIKEY = "tRH7uCd5CpJMh284te3eLAvCu8wp7LAU"
        this.source = "https://api.nytimes.com/svc/topstories/v2/home.json?api-key="
        this.payload = []
        this.logger = new Logger('Ny_times', "SCRAPPER")
    }
    getTime(time: string) {
        let parts = time.split(" ");
        if (parts.length > 1) {
        }
        return moment().subtract(`${parts[0]}, ${parts[1]}`).toISOString();
    }

    public async exec(): Promise<Inews[]> {
        this.logger.info('starting Link collection for NyTimes...')
        try {
            let Data = await axios.get(this.source + this.APIKEY)
            Data.data.results.map((article:/*  Ny_TimesAPI */any) => {
                if (!this.SectionsToIgnore.includes(article.section)) {
                    this.payload.push({
                        image_url: article.multimedia[0].url ? article.multimedia[0].url : null,
                        link: article.uri ? article.uri : null,
                        headline: article.title ? article.title : null,
                        published: this.getTime(article.published_date.toString()),
                        excerpt: article.abstract ? article.abstract : null,
                        author: article.byline ? article.byline : null,
                        category: article.section ? article.section : null
                    })
                }
            })
            this.logger.info('Returning' + this.payload.length + "Article ...")
            return this.payload
        } catch (error) {
            console.log(error)

            return this.payload
        }
    }

}
