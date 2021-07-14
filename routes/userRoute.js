let express = require("express");
let router = express.Router();
let userModel = require("../models/userModel");
const { validate } = require("express-validation");
const bcrypt = require("bcrypt");

// middleware
const formValidation = require("../middlewares/formValidation");
const authCheck = require("../middlewares/authCheck");
const appError = require("../middlewares/error/appError");

// 驗證 param 跟 jwt 裡的身分
router.use("/:sid", authCheck.sid);

// 取得用戶基本資料
router.get("/:sid", async (req, res) => {
  // 透過學號搜尋資料
  const userDoc = await userModel.findOne({
    sid: req.params.sid.toUpperCase(),
  });
  const userInfo = {
    username: userDoc.username,
    shiftTime: userDoc.shiftTime,
  };
  res.send(userInfo);
});

// 用戶更新密碼
router.patch(
  "/:sid/password",
  validate(formValidation.changePassword),
  async (req, res, next) => {
    const saltRounds = req.app.get("saltRounds");
    let sid = req.params.sid.toUpperCase();
    let oldPassword = req.body.oldPassword;
    let newPassword = req.body.newPassword;

    // 搜尋使用者資訊
    let userDoc = await userModel.findOne({ sid: sid });
    // 檢查密碼
    const isPasswordCorrect = await bcrypt.compare(oldPassword, userDoc.password);

    if (isPasswordCorrect) {
      //產生新密碼的雜湊
      let newPassword_hash = await bcrypt.hash(newPassword, saltRounds);

      // 更新密碼
      await userModel.updateOne(
        { sid: sid },
        { $set: { password: newPassword_hash } }
      );
      return res.end();
    }

    // 密碼錯誤
    let err = new appError(appError.errorMessageEnum.WRONG_PASSWORD, 400);
    next(err);
  }
);

module.exports = router;
