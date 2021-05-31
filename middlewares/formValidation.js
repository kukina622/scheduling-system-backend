function isSid(sid) {
	const regex_sid = /^[A-z][0-9]{8}$/;
	return regex_sid.test(sid);
}

function isUsername(username) {
	const regex_username=/\S/
	return (username!==undefined && regex_username.test(username))
}

function isPassword(password) {
	const regex_password=/\S/
	return (password!==undefined && regex_password.test(password))
}

module.exports.login = function (req, res, next) {
	const sid = req.body.sid;
	const password = req.body.password;
	if (isSid(sid) && isPassword(password)) {
		next();
	} else {
		res.status(422).json({ success: false, message: "Wrong data" });
	}
};

module.exports.register = function (req, res, next) {
	const sid = req.body.sid;
	const username = req.body.username;
	const password = req.body.password;
	if (isSid(sid) && isPassword(password) && isUsername(username)) {
		next();
	} else {
		res.status(422).json({ success: false, message: "Wrong data" });
	}
};
