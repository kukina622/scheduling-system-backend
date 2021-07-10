let express = require("express");
let SHA256 = require("js-sha256").sha256;
let userModel = require("../models/userModel");
let jwt = require("jsonwebtoken");
const formValidation = require("../middlewares/formValidation");
const { validate } = require("express-validation");
const appError = require("../middlewares/error/appError");

let router = express.Router();

router.post(
  "/login",
  validate(formValidation.login),
  async (req, res, next) => {
    const serect_key = await req.app.get("serect_key");
    const loginInfo = {
      sid: req.body.sid.toUpperCase(),
      password: SHA256(req.body.password),
    };
    // 搜尋 loginInfo
    let userDoc = await userModel.findOne(loginInfo);
    // 檢查帳號密碼是否正確
    if (userDoc === null) {
      let err = new appError(appError.errorMessageEnum.LOGIN_FAILED, 401);
      next(err);
    } else {
      const token = jwt.sign(
        { sid: userDoc.sid, isAdmin: userDoc.isAdmin },
        serect_key,
        { expiresIn: "1h" }
      );
      res.status(200).json({ sid: userDoc.sid, token: token });
    }
  }
);

module.exports = router;
