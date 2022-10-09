import { Ilocals } from "../types";
import dotenv from "dotenv";
import path from "path";

export default class Locals {
  public static config(): Ilocals {
    dotenv.config({ path: "../.env" });

    const HeroServerPORT = parseInt(process.env.HERO_SERVER_PORT!) || 6806;
    const DiscordWebhook = process.env.DISCORD_WEBHOOK || null;
    const PeriodCheckInMinutes =
      parseInt(process.env.PERIOD_CHECK_IN_MINUTES!) % 60 || 30;

    const UserName = process.env.USER_NAME || "";
    const Password = process.env.PASS_WORD || "";
    return {
      UserName,
      Password,
    };
  }
}
