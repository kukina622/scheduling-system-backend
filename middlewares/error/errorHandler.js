let appError = require("./appError");
const { ValidationError } = require("express-validation");
const { UnauthorizedError } = require("express-jwt");

function errorHandler(err, req, res, next) {
  let resError;

  if (err instanceof ValidationError) {
    resError = new appError(appError.errorMessageEnum.INVALID_FORMDATA, 400);
  } else if (err instanceof UnauthorizedError) {
    //JWT 錯誤
    let message = err.message;
    switch (message) {
      case "jwt expired":
        resError = new appError(appError.errorMessageEnum.TOKEN_EXPIRED, 401);
        break;
      default:
        resError = new appError(appError.errorMessageEnum.INVALID_TOKEN, 401);
        break;
    }
  } else {
    resError = err;
  }

  // 從enum中找出errorMessage
  let errorMessage = Object.keys(appError.errorMessageEnum).find((key) => {
    return appError.errorMessageEnum[key] === resError.errorMessage;
  });
  return res.status(resError.stateCode).json({ message: errorMessage });
}

module.exports = errorHandler;
