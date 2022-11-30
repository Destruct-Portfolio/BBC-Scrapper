/** @format */

import fs from "fs";
import path from "path";

class Log {
  public baseDir: string;
  public filename: string;
  public linePrefix: string;
  public today: Date = new Date();
  constructor() {
    let _dateString = `${this.today.getFullYear()}-${
      this.today.getMonth() + 1
    }-${this.today.getDate()}`;
    let _timeString = `${this.today.getHours()}:${this.today.getMinutes()}:${this.today.getSeconds()}`;
    const dirname = path.dirname("logs");
    this.baseDir = path.join(dirname);
    this.filename = `server-api-${_dateString}.log`;
    this.linePrefix = `[${_dateString} ${_timeString}]`;
  }
  public info(_msg: string): void {
    this.addlog("INFO", _msg);
  }
  public warn(_msg: string): void {
    this.addlog("WARN", _msg);
  }
  public error(_msg: string): void {
    console.log("\x1b[31m%s\x1b[0m", "[ERROR] :: " + _msg.split(/r?\n/)[0]);
    this.addlog("ERROR", _msg);
  }
  public custom(_filename: string, _string: string): void {
    this.addlog(_filename, _string);
  }
  private addlog(_kind: string, _message: string): void {
    _kind = _kind.toUpperCase();
    const _that = this;
    fs.open(
      `${_that.baseDir}/logs/${_that.filename}`,
      "a",
      (_err, _fileDescriptor) => {
        if (!_err && _fileDescriptor) {
          fs.appendFile(
            _fileDescriptor,
            `${_that.linePrefix} [${_kind}] : ${_message}\n`,
            (err) => {
              if (!err) {
                fs.close(_fileDescriptor, (_err) => {
                  if (!err) {
                    return true;
                  } else {
                    console.log(
                      "\x1b[31m%s\x1b[0m",
                      "Error closing log file that was being appended",
                    );
                  }
                });
              } else {
                return console.log(
                  "\x1b[31m%s\x1b[0m",
                  "Error appending to the log file",
                );
              }
            },
          );
        } else {
          return console.log(
            "\x1b[31m%s\x1b[0m",
            "Error cloudn't open the log file for appending",
          );
        }
      },
    );
  }
}

export default new Log();
