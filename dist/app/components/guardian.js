// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import Hero from "@ulixee/hero";
import Server from "@ulixee/server";
import axios from "axios";
import cheerio from "cheerio";
import Save from "../cors/save.js";
export default class TheGuardian {
    _client;
    _server;
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
        this.source = "https://www.theguardian.com/uk";
    }
    async fetchArticlesLinks() {
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
            console.log("Closing the farm ...");
        });
    }
    async _cleanup() {
        await this._client.close();
        await this._server.close();
    }
    async fetchMetadata() {
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
                        ? await this._client.document.querySelector("body > main > article > div > div > aside.dcr-1aul2ye > div > div > div > div.dcr-fj5ypv > div > details > summary")?.innerText
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
            console.log("Fetching entries ...");
            await this.fetchArticlesLinks();
            console.log("Completing metadata");
            await this.fetchMetadata();
        }
        else {
            console.log("Hero client failed to start.");
        }
        await this._cleanup();
        Save.SaveFile({
            Bbc_News: [],
            FT_News: [],
            Guardian_News: this.payload,
            Washington: [],
            Ny_Times: [],
            BloomBerg: []
        });
        return this.payload;
    }
}
