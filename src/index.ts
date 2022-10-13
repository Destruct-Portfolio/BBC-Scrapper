import { BBC } from "./componants/bbc_scrapper.js";
import { Snapshots } from "./cors/Snapshots.js";

import schedule from "node-schedule";

//Starter
class Index {
  public static async start() {
    let scraped_news = await new BBC()._exec();
    await new Snapshots(await scraped_news!)._exec();
  }
}

//Timeconfig
const TimeConfig = new schedule.RecurrenceRule();

TimeConfig.dayOfWeek = [0, new schedule.Range(0, 6)];

TimeConfig.hour = [0, new schedule.Range(0, 23)];

TimeConfig.minute = 0;

//Lunching the JOB
var job = schedule.scheduleJob(TimeConfig, async () => {
  await Index.start();
});

//await Index.start();
