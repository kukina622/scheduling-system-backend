let express = require("express");
let router = express.Router();
let userModel = require("../models/userModel");

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

module.exports = router;
