let appError = require("./appError");
const { ValidationError } = require("express-validation");

function errorHandler(err, req, res, next) {
  if (err instanceof ValidationError) {
    return res.status(400).json({ message: "INVALID_FORMDATA" });
  } else if (err instanceof appError) {
    // 從enum中找出errorMessage
    let errorMessage = Object.keys(appError.errorMessageEnum).find((key) => {
      return appError.errorMessageEnum[key] === err.errorMessage;
    });
    return res.status(err.stateCode).json({ message: errorMessage });
  }

  return res.status(500).json(err);
}

module.exports = errorHandler;
