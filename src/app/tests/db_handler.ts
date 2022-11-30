import { JsonFile } from "../types/index";
import { DB_Handler } from "../cors/db_handler.js";

let Data: JsonFile = {
  Bbc_News: [
    {
      link: "string2",
      headline: "stringf",
      image_url: "stringfear",
      published: "stringf",
      excerpt: " string",
      author: "string",
      category: "string",
    },
  ],
  FT_News: [],
  Guardian_News: [],
};

//console.log(await new DB_Handler(Data)._exec());

//console.log(await new DB_Handler(Data).GetFile("Wed_Nov_23_2022.json"));
