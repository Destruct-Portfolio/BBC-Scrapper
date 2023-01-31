import { Handler } from "./cors/Handler.js";
//Igniter
class Index {
    static async start() {
        await Handler.Start();
    }
}
//Time Config
/* const TimeConfig = new schedule.RecurrenceRule();

TimeConfig.dayOfWeek = [0, new schedule.Range(0, 6)];

TimeConfig.hour = [0, new schedule.Range(0, 23)];

TimeConfig.minute = 0;

//await Index.start();

//lights
var job = schedule.scheduleJob(TimeConfig, async () => {
  await Index.start();
});
 */
await Index.start();
