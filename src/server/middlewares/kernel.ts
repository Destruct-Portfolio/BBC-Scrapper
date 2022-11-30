import { Application } from "express";
import Http from "./http.js";

class bootstrap {
  public static init(_express: Application): Application {
    _express = Http.mount(_express);
    return _express;
  }
}

export default bootstrap;
