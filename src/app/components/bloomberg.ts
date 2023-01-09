/* import StorageHandler from "src/utils/storage.js" */
import NewsScrapper from "./scraper.js"

import { ISuperNode } from "@ulixee/hero"

export default class BloombergNewsScrapper extends NewsScrapper {
    public static siteURL = 'https://www.bloomberg.com'
    private static selectors = {
        articles: 'article.story-package-module__story.mod-story, article.article-story, article.single-story-module__story.mod-story, article.story-list-story.mod-story, article.story-package-module__story.mod-story',
        headline: '.story-package-module__story__headline',
        link: '.story-package-module__story__headline-link',
        category: '/html/body/main/div/div/article/div[1]/div[1]',
        author: '/html/body/main/div/div/article/div[1]/div[3]/div[1]/address/div/p/a',
        published: '/html/body/main/div/div/article/div[1]/div[3]/div[1]/div/time',
        excerpt: '/html/body/main/div/div/article/div/div[3]/div[2]/div/div/p[2]',
        image_url: '/html/body/main/div/div/article/div/div[3]/div[1]/figure/div/div/img'
    }

    public static exclusionList = [
        'most read', 'opinion', 'sponsored content', 'quicktake', 'citylab'
    ]
    private static includesAny(text: string, exclusionList: string[]) {
        for (const word of exclusionList) {
            if (text.includes(word)) {
                return true
            }
        }
        return false
    }



    constructor() {
        super()

    }

    protected async $extract() {
        if (this.$client) {
            const headlines: Pick<typeof this.$payload[number], "headline" | "link">[] = []

            await this.$client.goto(BloombergNewsScrapper.siteURL)
            await this.$client.waitForLoad("DomContentLoaded")

            const articles = this.$client.document.querySelectorAll(BloombergNewsScrapper.selectors.articles)

            await articles.forEach(async article => {
                if (await article.querySelector(BloombergNewsScrapper.selectors.headline).$exists && await article.querySelector(BloombergNewsScrapper.selectors.link).$exists)
                    headlines.push({
                        headline: await article.querySelector(BloombergNewsScrapper.selectors.headline).innerText,
                        link: await article.querySelector(BloombergNewsScrapper.selectors.link).getAttribute("href") || '',
                    })

            })

            main: for (const [index, headline] of headlines.entries()) {


                if (!headline.link!.includes("https:")) headline.link = BloombergNewsScrapper.siteURL + headline.link
                await this.$client.goto(headline.link!)
                await this.$client.waitForLoad("DomContentLoaded")

                let info = []
                for (const attr of (["category", "author", "published", "excerpt", "image_url"] as const)) {
                    const element = this.$client!.xpathSelector(BloombergNewsScrapper.selectors[attr])
                    if (await element.$exists) {

                        let data
                        if (attr !== "image_url")
                            data = await element.innerText
                        else
                            data = await element.getAttribute("src")

                        if (attr === 'category' && data && BloombergNewsScrapper.includesAny(data.toLocaleLowerCase(), BloombergNewsScrapper.exclusionList)) {
                            data = data.replace("\n", " | ")
                            continue main
                        }


                        info.push(data)
                    } else {
                        info.push(null)
                    }
                }

                const [category, author, published, excerpt, image_url] = info

                this.$payload.push({
                    headline: headline.headline,
                    link: BloombergNewsScrapper.siteURL + headline.link,
                    author: author,
                    category: category,
                    published: published,
                    excerpt: excerpt,
                    image_url: image_url
                })
            }

            console.log(this.$payload)
            /*   return this.$payload */
        }

    }
}