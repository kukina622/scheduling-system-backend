let express = require("express");
let userModel = require("../models/userModel");
const formValidation = require("../middlewares/formValidation");
const { validate } = require("express-validation");
const appError = require("../middlewares/error/appError");
const bcrypt = require("bcrypt");

let router = express.Router();

router.post(
  "/register",
  validate(formValidation.register),
  async (req, res, next) => {
    const saltRounds = req.app.get("saltRounds");
    let sid = req.body.sid.toUpperCase();
    let password = req.body.password;
    let username = req.body.username;

    // 檢查學號是否註冊過
    let isExisted = await userModel.exists({ sid: sid });
    if (isExisted) {
      let err = new appError(appError.errorMessageEnum.SID_EXISTED, 409);
      next(err);
    } else {
      let password_hash = await bcrypt.hash(password, saltRounds);
      const registerInfo = {
        sid: sid,
        username: username,
        password: password_hash,
      };
      // 建立新帳號
      userModel
        .create(registerInfo)
        .then(() => {
          res.status(201).end();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
);

module.exports = router;
