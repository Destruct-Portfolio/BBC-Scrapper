import { Inews } from "../types"
import axios from "axios"
import Save from "../cors/save"
import Logger from "../misc/logger.js"


export default class Washington {
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
        this.logger = new Logger('Washigton', "SCRAPPER")
        this.APIKEY = "tRH7uCd5CpJMh284te3eLAvCu8wp7LAU"
        this.source = "https://api.nytimes.com/svc/topstories/v2/home.json?api-key="
        this.payload = []
    }

    public async exec(): Promise<Inews[]> {
        this.logger.info('Collecting for Washington ... ')
        try {
            let Data = await axios.get(this.source + this.APIKEY)
            Data.data.results.map((article:/*  Ny_TimesAPI */any) => {
                if (!this.SectionsToIgnore.includes(article.section)) {
                    this.payload.push({
                        image_url: article.multimedia[0].url ? article.multimedia[0].url : null,
                        link: article.uri ? article.uri : null,
                        headline: article.title ? article.title : null,
                        published: article.published_date.toString(),
                        excerpt: article.abstract ? article.abstract : null,
                        author: article.byline ? article.byline : null,
                        category: article.section ? article.section : null
                    })
                }
            })

            return this.payload
        } catch (error) {
            console.log(error)

            return this.payload
        }
    }

}
