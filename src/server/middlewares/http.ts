/** @format */

import { Application } from "express";
import bodyParser from "body-parser";

class Http {
  public static mount(_express: Application): Application {
    _express.use(bodyParser.json());
    return _express;
  }
}

export default Http;
