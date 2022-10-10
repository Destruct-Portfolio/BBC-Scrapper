import { Snapshots } from "../cors/Snapshots.js";

import { Inews } from "../types";

let data: Inews[] = [
  {
    link: "striferng",
    headline: "string",
    image_url: "string",
    published: "string",
    excerpt: "string",
    author: "string",
    category: "string",
  },
  {
    link: "feafe",
    headline: "string",
    image_url: "string",
    published: "string",
    excerpt: "string",
    author: "string",
    category: "string",
  },
  {
    link: "feafdzadze",
    headline: "string",
    image_url: "string",
    published: "string",
    excerpt: "stfeafearing",
    author: "string",
    category: "string",
  },
  {
    link: "deadeaedfeafdzadze",
    headline: "string",
    image_url: "string",
    published: "string",
    excerpt: "stfeafearing",
    author: "string",
    category: "string",
  },
];

console.log(await new Snapshots(data)._exec());
