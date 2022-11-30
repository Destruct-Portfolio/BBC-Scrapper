/** @format */

import { Handler, Request, response, Response } from "express";

class Handlers {
  public static async index(req: Request, res: Response, next: Handler) {
    const { players } = req.body;
    console.log(players);
  }

  public static default(req: any, res: any, next: any): any {
    res.status(404).send("NOT FOUND.");
  }
}

export default Handlers;
