let express = require("express");
let router = express.Router();
let userModel = require("../models/userModel");

router.get("/:sid", async (req, res) => {
  // 透過學號搜尋資料
  const userDoc = await userModel.findOne({ sid: req.params.sid });

  const userInfo = {
    username: userDoc.username,
    shiftTime: userDoc.shiftTime,
  };

  res.send(userInfo);
});

module.exports = router;
