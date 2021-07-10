let express = require("express");
let router = express.Router();
let userModel = require("../models/userModel");
const formValidation = require("../middlewares/formValidation");
const { validate } = require("express-validation");
const { sha256 } = require("js-sha256");
const authCheck = require("../middlewares/authCheck");

// 驗證 param 跟 jwt 裡的身分
router.use("/:sid",authCheck.sid);

// 取得用戶基本資料
router.get("/:sid", async (req, res) => {
  // 透過學號搜尋資料
  const userDoc = await userModel.findOne({ sid: req.params.sid.toUpperCase() });
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
  async (req, res) => {
    const userInfo = {
      sid: req.params.sid.toUpperCase(),
      password: sha256(req.body.oldPassword),
    };
    const newPassword = sha256(req.body.newPassword);
    // 檢查密碼
    const isPasswordCorrect = await userModel.exists(userInfo);
    if (isPasswordCorrect) {
      // 更新密碼
      await userModel.updateOne(userInfo, { $set: { password: newPassword } });
      return res.end();
    }

    // 密碼錯誤
    return res.status(400).json({ message: "Password Wrong" });
  }
);

module.exports = router;
