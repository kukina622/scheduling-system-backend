class appError extends Error {
  static errorMessageEnum = appError.#makeEnum([
    "SID_EXISTED",
    "LOGIN_FAILED",
    "INVALID_FORMDATA",
    "WRONG_PASSWORD",
    "NO_PERMISSION",
    "INVALID_TOKEN",
    "UNKNOWN_USER"
  ]);

  constructor(errorMessage, stateCode) {
    super()
    this.errorMessage = errorMessage;
    this.stateCode = stateCode;
  }

  static #makeEnum(ary) {
    let result = {};
    ary.forEach((n) => {
      result[n] = Symbol(n);
    });
    return Object.freeze(result);
  }
}

module.exports = appError