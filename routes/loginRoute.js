let express = require("express");
let SHA256 = require("js-sha256").sha256;
let userModel = require("../models/userModel");
let jwt = require("jsonwebtoken");
const formValidation = require("../middlewares/formValidation");
const { validate } = require("express-validation");

let router = express.Router();

router.post("/login", validate(formValidation.login), async (req, res) => {
  const serect_key = await req.app.get("serect_key");
  const loginInfo = {
    sid: req.body.sid.toUpperCase(),
    password: SHA256(req.body.password),
  };
  // 搜尋 loginInfo
  let doc = await userModel.findOne(loginInfo);
  // 檢查帳號密碼是否正確
  if (doc === null) {
    res.status(401).json({ success: false, message: "Wrong Sid or password" });
  } else {
    const token = jwt.sign({ sid: doc.sid }, serect_key, { expiresIn: "1h" });
    res
      .status(200)
      .json({ success: true, message: "Login successful", token: token });
  }
});

module.exports = router;
