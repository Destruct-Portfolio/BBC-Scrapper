import Hero from "@ulixee/hero";

import Server from "@ulixee/server";

import fs from "fs";

import { Inews } from "../types";

import Logger from "../misc/logger.js";

import moment from "moment";

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
      this._logger.info("shutting down server and client");
    });
  }

  private async _scarpe() {
    await this._client!.goto(this._source);
    await this._client!.waitForLoad("DomContentLoaded");
    fs.writeFileSync("page.jpeg", await this._client!.takeScreenshot());

    this._logger.info("page loaded starting scraping ... ");
    let FirstRows = await this._client!.document.querySelectorAll(
      "div.gel-layout__item.nw-c-top-stories__secondary-item"
    ).$map(async (item) => {
      let headline = await item.querySelector("a");

      let excerpt = await item.querySelector("p");

      let category = await item.querySelector("li:nth-child(2)");

      let published = await item.querySelector("li > span > time > span");

      let img = await item.querySelector("img");

      this._payload.push({
        link: await item.querySelector("a").href,

        headline: headline ? await headline.innerText : null,

        image_url: img ? await img.src : null,

        excerpt: excerpt ? await excerpt.innerText : null,

        category: category ? await category.innerText : null,

        author: null,

        published: published ? this.getTime(await published.innerText) : null,
      });
    });

    let FirstRows2 = await this._client!.document.querySelectorAll(
      "div.gel-layout__item.nw-c-top-stories__tertiary-items"
    ).$map(async (item) => {
      let headline = await item.querySelector("a");

      let excerpt = await item.querySelector("p");

      let category = await item.querySelector("li:nth-child(2)");

      let published = await item.querySelector("li > span > time > span");

      let img = await item.querySelector("img");

      this._payload.push({
        link: await item.querySelector("a").href,

        headline: headline ? await headline.innerText : null,

        image_url: img ? await img.src : null,

        excerpt: excerpt ? await excerpt.innerText : null,

        category: category ? await category.innerText : null,

        author: null,

        published: published ? this.getTime(await published.innerText) : null,
      });
    });
  }

  getTime(time: string) {
    let parts = time.split(" ");
    if (parts.length > 1) {
    }
    return moment().subtract(`${parts[0]}, ${parts[1]}`).toISOString();
  }

  private async _getAuthors() {
    this._logger.info("Getting Authors ...");
    for (var article of this._payload) {
      await this._client!.goto(article.link!);

      let author = await this._client!.querySelector(
        "#main-content > div.ssrcss-1ocoo3l-Wrap.e42f8511 > div > div.ssrcss-rgov1k-MainColumn.e1sbfw0p0 > article > div.ssrcss-1bdte2-BylineComponentWrapper.e8mq1e90 > div > div > div.ssrcss-1dtr1ls-Container-ContributorDetails.e8mq1e913 > div.ssrcss-68pt20-Text-TextContributorName.e8mq1e96"
      );

      if (author === null) {
        article.author = null;
      } else {
        article.author = await (await author.innerText).substring(3);
      }
    }
  }

  private async _clearnup() {
    await this._client!.close();
    await this._server!.close();
  }

  public async _exec() {
    this._logger.info("Starting Scraping ... ");

    this._logger.info("starting hero server and client ... ");

    await this._setup();
    if (this._client !== null) {
      await this._scarpe();

      await this._getAuthors();

      await this._clearnup();

      return this._payload;
    } else {
      this._logger.error("Hero Failed to launch");
    }
  }
}
