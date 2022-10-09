import { BBC } from "./componants/bbc_scrapper.js";
import { Snapshots } from "./cors/Snapshots.js";

//console.log(await new BBC()._exec());

let luanch = await new BBC()._exec();
await new Snapshots(await luanch!)._exec();
