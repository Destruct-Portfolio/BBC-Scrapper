import { Handler } from "./cors/Handler.js";
import { DB_Handler } from "./cors/db_handler.js";

import schedule from "node-schedule";

//Igniter
class Index {
  public static async start() {
    await Handler.Start();
  }
}

//Time Config
const TimeConfig = new schedule.RecurrenceRule();

TimeConfig.dayOfWeek = [0, new schedule.Range(0, 6)];

TimeConfig.hour = [0, new schedule.Range(0, 23)];

TimeConfig.minute = 0;

//await Index.start();

//lights
var job = schedule.scheduleJob(TimeConfig, async () => {
  await Index.start();
});


await Index.start()