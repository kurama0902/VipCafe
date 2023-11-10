class Logger {
  /**
   * @type {boolean}
   * @private
   */
  _isProd = true;
  constructor() {
    if(process.env.NODE_ENV === "development") {
      this._isProd = false;
    } else {
      window.hiddenLogs = [];
    }
  }

  /**
   * @param arg
   */
  log(...arg) {
    if(this._isProd) return this._addHiddenLog(arg);
    console.log(arg)
  }

  /**
   * @param arg
   * @private
   */
  _addHiddenLog(arg) {
    window.hiddenLogs.push(arg)
  }
}

export const LoggerService = new Logger();
