let express = require("express");
let SHA256 = require("js-sha256").sha256;
let userModel = require("../models/userModel");
const formValidation = require("../middlewares/formValidation");
const { validate } = require('express-validation')

let router = express.Router();

router.post("/register",validate(formValidation.register), async (req, res) => {
	const registerInfo = {
		sid: req.body.sid,
		username: req.body.username,
		password: SHA256(req.body.password),
	};
	// 檢查學號是否註冊過
	let isExisted = await userModel.exists({ sid: registerInfo.sid });

	if (isExisted) {
		res.status(409).json({ message: "SID is existed" });
	} else {
		// 建立新帳號
		userModel
			.create(registerInfo)
			.then(() => {
				res.status(201).end()
			})
			.catch((err) => {
				console.log(err);
			});
	}
});

module.exports = router;