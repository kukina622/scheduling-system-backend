let appError = require("./appError");
const { ValidationError } = require("express-validation");
const { UnauthorizedError } = require("express-jwt");

function errorHandler(err, req, res, next) {
  if (err instanceof ValidationError) {
    return res.status(400).json({ message: "INVALID_FORMDATA" });
  } else if (err instanceof appError) {
    // 從enum中找出errorMessage
    let errorMessage = Object.keys(appError.errorMessageEnum).find((key) => {
      return appError.errorMessageEnum[key] === err.errorMessage;
    });
    return res.status(err.stateCode).json({ message: errorMessage });
  } else if (err instanceof UnauthorizedError) { //JWT 錯誤
    return res.status(401).json({ message: "INVALID_TOKEN" });
  }
  return res.status(500).json(err);
}

module.exports = errorHandler;
