<<<<<<< HEAD
import { Inews } from "../types"
import axios from "axios"


export default class Ny_Times {
    private APIKEY: string
    private source: string
    private payload: Inews[]


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
    }

    public async exec(): Promise<Inews[]> {
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
=======
import Hero from "@ulixee/hero";
import Server from "@ulixee/server";
import { Inews } from "../types";

export default class Washington {
    private client: Hero | null
    private Server: Server | null
    private payload: Inews[]

    Ignore = [
        "ONLY FROM THE POST"
        , "BEST OF THE POST IN 2022"
        , "Top picks from our newsroom, curated for you"
        , "MOST READ"
        , "ADVICE"
        , "FOR YOU"
        , "Recommended stories"
        , "WELL + BEING"
        , "News and advice to live well every day"
        , "THE HOME YOU OWN"
        , "opinions"
        , "BOOK WORLD"
        , "News, reviews and big ideas for all things fiction and nonfiction"
        , "ARTS & ENTERTAINMENT"
        , "FOOD"
        , "lifestyle"
        , "TRAVEL"
        , "DON’T MISS"
        , "DIVERSIONS"
        , "lifestyle"

    ]
    links = [
        "https://www.washingtonpost.com/world/2022/12/31/pope-benedict-death-catholic-church/",
        "https://www.washingtonpost.com/world/2023/01/01/india-poonawala-walkar-murder-case/",
        "https://www.washingtonpost.com/nation/2022/12/31/idaho-murder-suspect-stabbing-pa/",
    ]

    constructor() {
        this.client = null
        this.Server = null
        this.payload = []
    }



    private async setup() {
        this.Server = new Server();
        await this.Server.listen({
            port: 8084,
        });
        this.client = new Hero({
            connectionToCore: { host: `ws://localhost:${8084}` },
        });

        this.client.on("close", () => {
            console.log("Closing Down client Instance ... ");
        });
    }

    private async Try() {
        await this.client!.goto('https://www.washingtonpost.com', { timeoutMs: 0 });
        await this.client!.waitForLoad('AllContentLoaded');


        let t = await this.client!.document.querySelectorAll('.headline').$map(async (item) => {
            if (!this.Ignore.includes(await item.querySelector('a').href)) {
                this.payload.push({
                    link: await item.querySelector('a').href,
                    headline: await item.querySelector('a').innerText,
                    image_url: null,
                    published: null,
                    excerpt: null,
                    author: null,
                    category: null,
                })
            }
        })


        for (var i = 0; i <= this.payload.length; i++) {
            console.log(this.payload[i].link)
            await this.client!.goto(this.payload[i].link!, { timeoutMs: 0 })

            let excerpt = this.client!.document.querySelector('h2')

            let img = this.client!.document.querySelector(`figure > div > img`)

            let authors = this.client!.document.querySelector('#__next > div.grid-layout > main > div.grid-full-inner-standard > header > div.flex.print-byline.print-mt-none > div > div.mb-xxs.flex')

            let data = this.client!.document.querySelector('#__next > div.grid-layout > main > div.grid-full-inner-standard > header > div.flex.print-byline.print-mt-none > div > div.wpds-c-kgabfe.wpds-c-kgabfe-ikrKXLV-css > span.wpds-c-iKQyrV.gray-dark.display-date')

            this.payload[i].excerpt = await excerpt.$exists ? await excerpt.innerText : null;
            this.payload[i].image_url = await img.$exists ? await img.srcset : null;
            this.payload[i].author = await authors.$exists ? await authors.innerText : null;
            this.payload[i].published = await data.$exists ? await data.innerText : null;

            console.log(this.payload[i])

        }

    }




    public async exec() {
        await this.setup()
        if (this.setup !== null) {
            await this.Try()
            return this.payload
        } else {
            console.log("Fuck you ")
            return this.payload
        }
    }
}

>>>>>>> 797addfe65cdd14743d134ba2b53a4614bf75b0a
