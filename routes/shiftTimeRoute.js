let express = require("express");
let router = express.Router();
let userModel = require("../models/userModel");
const { validate } = require("express-validation");

// middleware
const authCheck = require("../middlewares/authCheck");
const formValidation = require("../middlewares/formValidation");

// 取得所有人的值班時間
router.get("/all", async (req, res) => {
  // 找出有要值班的人
  let allUserShiftTime = await userModel.find(
    {
      "shiftTime.0": { $exists: true },
    },
    { _id: 0, username: 1, sid: 1, shiftTime: 1 }
  );
  res.json({ allUserShiftTime: allUserShiftTime });
});

// 更新值班時間
router.patch(
  "/:sid",
  authCheck.sid,
  validate(formValidation.updateShiftTime),
  async (req, res) => {
    const newShiftTime = req.body.shiftTime.sort();
    const sid = req.params.sid.toUpperCase();
    await userModel.updateOne(
      { sid: sid },
      { $set: { shiftTime: newShiftTime } }
    );
    res.end()
  }
);

module.exports = router;
