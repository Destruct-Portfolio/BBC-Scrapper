import Hero from "@ulixee/hero";

import Server from "@ulixee/server";

import fs from "fs";

import { Inews } from "../types";

import Logger from "../misc/logger.js";

export class BBC {
  private _client: Hero | null;

  private _server: Server | null;

  private _logger: Logger;

  private _source: string;

  private _payload: Inews[];

  constructor() {
    this._client = null;

    this._source = "https://www.bbc.co.uk/news";

    this._server = null;

    this._logger = new Logger("BBC", "SCRAPPER");

    this._payload = [];
  }

  private async _setup() {
    this._server = new Server();
    await this._server.listen({ port: 8080 });
    this._client = new Hero({
      connectionToCore: {
        host: `ws://localhost:${8080}`,
      },
    });

    this._client.on("close", () => {
      // ...
    });
  }

  private async _scarpe() {
    await this._client!.goto(this._source);
    console.log("am there");
    await this._client!.waitForLoad("DomContentLoaded");
    fs.writeFileSync("ting.jpeg", await this._client!.takeScreenshot());

    let FirstRows = await this._client!.document.querySelectorAll(
      "div.gel-layout__item.nw-c-top-stories__secondary-item"
    ).$map(async (item) => {
      this._payload.push({
        link: await item.querySelector("a").href,
        headline: await item.querySelector("a").innerText,
        image_url: await item.querySelector("img").src,
        category: await item.querySelector("p").innerHTML,
        excerpt: await item.querySelector("li:nth-child(2)").innerText,
        author: null,
        published: await item.querySelector("li > span > time > span")
          .innerText,
      });
    });

    let FirstRows2 = await this._client!.document.querySelectorAll(
      "div.gel-layout__item.nw-c-top-stories__tertiary-items"
    ).$map(async (item) => {
      this._payload.push({
        link: await item.querySelector("a").href,
        headline: await item.querySelector("a").innerText,
        image_url: await item.querySelector("img").src,
        category: await item.querySelector("p").innerHTML,
        excerpt: await item.querySelector("li:nth-child(2)").innerText,
        author: null,
        published: await item.querySelector("li > span > time > span")
          .innerText,
      });
    });
  }

  private async _getAuthors() {
    for (var article of this._payload) {
      await this._client!.goto(article.link!);
      let author = await this._client!.querySelector(
        "#main-content > div.ssrcss-1ocoo3l-Wrap.e42f8511 > div > div.ssrcss-rgov1k-MainColumn.e1sbfw0p0 > article > div.ssrcss-1bdte2-BylineComponentWrapper.e8mq1e90 > div > div > div.ssrcss-1dtr1ls-Container-ContributorDetails.e8mq1e913 > div.ssrcss-68pt20-Text-TextContributorName.e8mq1e96"
      );
      if (author === null) {
        console.log(article.link + " ::: " + null);
        article.author = null;
      } else {
        console.log(article.link + " ::: " + author);
        article.author = await author.innerText;
      }
    }
  }

  public async _exec() {
    this._logger.info("Starting Scraping ... ");
    this._logger.info("INTIALIZING HERO");
    await this._setup();
    if (this._client !== null) {
      await this._scarpe();
      await this._getAuthors();
      return this._payload;
    } else {
      this._logger.error("Hero Failed to launch");
    }
  }
}
