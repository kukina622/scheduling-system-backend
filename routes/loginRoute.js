let express = require("express");
let userModel = require("../models/userModel");
let jwt = require("jsonwebtoken");
const formValidation = require("../middlewares/formValidation");
const { validate } = require("express-validation");
const appError = require("../middlewares/error/appError");
const bcrypt = require("bcrypt");

let router = express.Router();

router.post(
  "/login",
  validate(formValidation.login),
  async (req, res, next) => {
    const serect_key = req.app.get("serect_key");
    let sid = req.body.sid.toUpperCase();
    let password = req.body.password;
    // 搜尋使用者資訊
    let userDoc = await userModel.findOne({ sid: sid });

    // 檢查帳號密碼是否正確
    let loginSuccess =
      !!userDoc && (await bcrypt.compare(password, userDoc.password));

    if (loginSuccess) {
      const token = jwt.sign(
        { sid: userDoc.sid, isAdmin: userDoc.isAdmin },
        serect_key,
        { expiresIn: "1h" }
      );
      res.status(200).json({ sid: userDoc.sid, token: token });
    } else {
      let err = new appError(appError.errorMessageEnum.LOGIN_FAILED, 401);
      next(err);
    }
  }
);

module.exports = router;
