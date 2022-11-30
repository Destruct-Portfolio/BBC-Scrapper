import { Json_getter } from "../cors/db_getter.js";

let t = await new Json_getter().GetFile("Wed_Nov_23_2022.json");
console.log(t);
