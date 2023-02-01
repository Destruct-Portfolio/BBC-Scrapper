import Hero from "@ulixee/hero";
import Server from "@ulixee/server";
import fs from "fs";
import Logger from "../misc/logger.js";
import Save from "../cors/save.js";
export default class FT_scrapper {
    _client;
    _server;
    _logger;
    _source;
    _payload;
    constructor() {
        this._client = null;
        this._source = "https://www.ft.com";
        this._server = null;
        this._logger = new Logger("BBC", "SCRAPPER");
        this._payload = [];
    }
    async _setup() {
        this._server = new Server();
        await this._server.listen({ port: 8080 });
        this._client = new Hero({
            connectionToCore: {
                host: `ws://localhost:${8080}`,
            },
        });
        this._client.on("close", () => {
            this._logger.info("shutting down server and client");
        });
    }
    async Top_stories_and_news(selectr) {
        let x1 = await this._client.querySelectorAll(selectr).$map(async (item) => {
            let _link = item.querySelectorAll("a")[2];
            let _headline = item.querySelectorAll("a")[2];
            let _image_url = item.querySelector("img");
            let _category = item.querySelectorAll("a")[1];
            this._payload.push({
                link: _link ? await _link.href : null,
                headline: _headline ? await _headline.innerText : null,
                image_url: _image_url ? await _image_url.src : null,
                category: _category ? await _category.innerText : null,
                author: null,
                excerpt: null,
                published: null,
            });
        });
    }
    async Market_and_Tech(selector, category) {
        let X2 = this._client.querySelector(selector);
        let seections = await X2.querySelectorAll("div.story-group__article-wrapper").$map(async (item) => {
            let image = item.querySelector("img");
            let _link = item.querySelector("a");
            let _headline = item.querySelector("a");
            this._payload.push({
                image_url: image ? await image.src : null,
                link: _link ? await _link.href : null,
                headline: _headline
                    ? this.format(await _headline.innerText)
                    : null,
                category: category,
                author: null,
                excerpt: null,
                published: null,
            });
        });
    }
    format(text) {
        if (text.includes("\n")) {
            let t = text.split("\n");
            return t[1];
        }
        else {
            return text;
        }
    }
    async _scarpe() {
        await this._client.goto(this._source);
        await this._client.waitForLoad("DomContentLoaded");
        fs.writeFileSync("page.jpeg", await this._client.takeScreenshot());
        this._logger.info("page loaded starting scraping ... ");
        this._logger.info("Getting Top Stories");
        let topStories = await this.Top_stories_and_news("#site-content > div:nth-child(3) > section > div > div.layout-desktop__grid-container > div");
        this._logger.info("Getting News Section ");
        let news = await this.Top_stories_and_news("#site-content > div:nth-child(9) > section > div > div.layout-desktop__grid-container > div");
        this._logger.info("Getting Market News");
        let marketNews = await this.Market_and_Tech("#site-content > div:nth-child(18) > section > div > div.layout-desktop__grid-container > div", "Market");
        this._logger.info("Getting Tech News");
        let techNews = await this.Market_and_Tech("#site-content > div:nth-child(19) > section > div > div.layout-desktop__grid-container > div", "tech news");
    }
    async _clearnup() {
        await this._client.close();
        await this._server.close();
    }
    async exec() {
        this._logger.info("Starting Scraping ... ");
        this._logger.info("starting hero server and client ... ");
        await this._setup();
        if (this._client !== null) {
            await this._scarpe();
            await this._clearnup();
            Save.SaveFile({
                Bbc_News: [],
                FT_News: this._payload,
                Guardian_News: [],
                Washington: [],
                Ny_Times: [],
                BloomBerg: []
            });
            return this._payload;
        }
        else {
            this._logger.error("Hero Failed to launch");
            return this._payload;
        }
    }
}
