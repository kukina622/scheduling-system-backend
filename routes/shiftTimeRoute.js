let express = require("express");
let router = express.Router();
const { validate } = require("express-validation");

// Model
let userModel = require("../models/userModel");
let shiftModel = require("../models/shiftModel");

// middleware
const authCheck = require("../middlewares/authCheck");
const formValidation = require("../middlewares/formValidation");
const appError = require("../middlewares/error/appError");

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
    res.end();
  }
);

// 跟其他人換班
router.post(
  "/:sid/shift",
  authCheck.sid,
  validate(formValidation.shift),
  async (req, res, next) => {
    const sid = req.params.sid.toUpperCase();
    const target_SID = req.body.target.toUpperCase();
    let orginalDateArray = req.body.orginalDate.split("-").map((n) => Number(n));
    let shiftDateArray = req.body.shiftDate.split("-").map((n) => Number(n));
    let orginalDate = new Date(
      orginalDateArray[0],
      orginalDateArray[1] - 1,
      orginalDateArray[2] + 1
    );
    let shiftDate = new Date(
      shiftDateArray[0],
      shiftDateArray[1] - 1,
      shiftDateArray[2] + 1
    );
    // 檢查目標存在與否
    let isTargetExisted = await userModel.exists({ sid: target_SID });
    if (isTargetExisted) {
      // 取得目標對象的objectId
      let objectIdOfTarget = (await userModel.findOne({ sid: target_SID }, { _id: 1 }))._id;
      // 取得自己的objectId
      let objectIdOfOwn = (await userModel.findOne({ sid: sid }, { _id: 1 }))._id;
      // 建立document
      await shiftModel.create({
        user_1: objectIdOfOwn,
        shiftDate_1: orginalDate,
        user_2: objectIdOfTarget,
        shiftDate_2: shiftDate,
      });
      res.status(201).end();
    }else{
      let err = new appError(appError.errorMessageEnum.UNKNOWN_USER,400)
      next(err)
    }
  }
);

module.exports = router;
