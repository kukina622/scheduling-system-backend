let express = require("express");
let SHA256 = require("crypto-js/sha256");
let userModel = require("../models/userModel");

let router = express.Router();

router.post("/register", async (req, res) => {
	const registerInfo = {
		sid: req.body.sid,
		username: req.body.username,
		password: SHA256(req.body.password),
	};
	// 檢查學號是否註冊過
	let isExisted = await userModel.exists({ sid: registerInfo.sid });
  
	if (isExisted) {
		res.json({ success: false, message: "SID is existed" });
	} else {
		// 建立新帳號
		userModel
			.create(registerInfo)
			.then(() => {
				res.json({ success: true, message: "Registered success" });
			})
			.catch((err) => {
				console.log(err);
			});
	}
});

module.exports = router;
