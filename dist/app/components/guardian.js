// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import Hero from "@ulixee/hero";
import Server from "@ulixee/server";
import axios from "axios";
import cheerio from "cheerio";
import Logger from "../misc/logger.js";
import moment from "moment";
export default class TheGuardian {
    _client;
    _server;
    _logger;
    payload;
    source;
    static _exclusionList = [
        "Opinion",
        "Editorial & Letters",
        "Sport",
        "Video",
        "Culture",
        "Lifestyle",
        "Guardian Labs",
        "Take part",
        "Explore",
        "Newsletters",
        "In pictures",
        "Most Viewed",
    ];
    constructor() {
        this._client = null;
        this._server = null;
        this.payload = [];
        this._logger = new Logger('TheGuardian', 'SCRAPPER');
        this.source = "https://www.theguardian.com/uk";
    }
    async fetchArticlesLinks() {
        this._logger.info('Collecting ArticlesLinks');
        // Grab the HTML body
        let page = await axios.get(this.source);
        const html = await page.data;
        const $ = cheerio.load(html);
        // Grab the sections
        // Verify if the header is on the exclusion list
        // If not then, grab the article's links and metadata.
        let result = [];
        $("section", html).each(function () {
            let section = $(this).find("h2").text().trim();
            if (section &&
                section !== "" &&
                section.length < 30 &&
                !TheGuardian._exclusionList.includes(section)) {
                $(this)
                    .find(".fc-item__container")
                    .each(function () {
                    let headline = $(this)
                        .find(".fc-item__title")
                        .text()
                        .trim()
                        .split("0", 150)[0];
                    let link = $(this).find("a").attr("href");
                    let excerpt = $(this).find("a").text().replace(headline, "");
                    let image_url = $(this).find(".responsive-img").attr("src") || "./no-preview.jpg";
                    const entry = {
                        link: link ? link : null,
                        headline: headline ? headline : null,
                        image_url: image_url ? image_url : null,
                        excerpt: excerpt ? image_url : null,
                        author: null,
                        category: null,
                        published: null,
                    };
                    result.push(entry);
                    console.log(JSON.stringify(entry, null, 2));
                });
            }
        });
        this.payload = result;
    }
    async _setup() {
        this._server = new Server();
        await this._server.listen({ port: 6306 });
        this._client = new Hero({
            connectionToCore: {
                host: `ws://localhost:${6306}`,
            },
        });
        this._client.on("close", () => {
            this._logger.info("shutting down server and client");
        });
    }
    async _cleanup() {
        await this._client.close();
        await this._server.close();
    }
    getTime(time) {
        let parts = time.split(" ");
        if (parts.length > 1) {
        }
        return moment().subtract(`${parts[0]}, ${parts[1]}`).toISOString();
    }
    async fetchMetadata() {
        this._logger.info("Strating Scraping for each headline collected ... ");
        for (const [index, entry] of this.payload.entries()) {
            if (entry.link) {
                const link = new URL(entry.link);
                console.log(`Navigating to ${link.href}`);
                try {
                    await this._client.goto(link.href);
                    await this._client.waitForLoad("AllContentLoaded");
                    let author = await this._client.document.querySelector("body > main > article > div > div > aside.dcr-1aul2ye > div > div > div > div.dcr-fj5ypv > div > address > div")?.$exists;
                    author = author
                        ? await this._client.document.querySelector("body > main > article > div > div > aside.dcr-1aul2ye > div > div > div > div.dcr-fj5ypv > div > address > div")?.innerText
                        : null;
                    let published = await this._client.document.querySelector("body > main > article > div > div > aside.dcr-1aul2ye > div > div > div > div.dcr-fj5ypv > div > details > summary")?.$exists;
                    published = published
                        ? this.getTime(await this._client.document.querySelector("body > main > article > div > div > aside.dcr-1aul2ye > div > div > div > div.dcr-fj5ypv > div > details > summary")?.innerText)
                        : null;
                    const category = link.pathname.split("/")[1];
                    // This makes sure that we only pick the name and not the honorifics or titles.
                    author = author.split(" ").slice(0, 2).join(" ");
                    this.payload[index].author = author;
                    this.payload[index].published = published;
                    this.payload[index].category = category;
                    console.log(`Author: ${author} | Category: ${category} | Published: ${published}`);
                }
                catch (error) {
                    console.log(`${error}`);
                    continue;
                }
            }
        }
    }
    async exec() {
        await this._setup();
        if (this._client !== null) {
            this._logger.info("Fetching entries ...");
            await this.fetchArticlesLinks();
            this._logger.info("Completing metadata");
            await this.fetchMetadata();
        }
        else {
            this._logger.error('Hero client failed to start.');
        }
        await this._cleanup();
        return this.payload;
    }
}
