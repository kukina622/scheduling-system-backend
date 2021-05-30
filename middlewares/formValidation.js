function isSid(sid) {
	const regex_sid = /^[A-z][0-9]{8}$/;
	return regex_sid.test(sid);
}

module.exports.login = function (req, res, next) {
	const sid = req.body.sid;
	const password = req.body.password;
	if (isSid(sid) && password !== undefined) {
		req.body.password = String(password);
		next();
	} else {
		res.status(422).json({ success: false, message: "Data wrong" });
	}
};

module.exports.register = function (req, res, next) {
	const sid = req.body.sid;
	const username = req.body.username;
	const password = req.body.password;
	if (isSid(sid) && password !== undefined && username !== undefined) {
		req.body.password = String(password);
		req.body.username = String(username);
		next();
	} else {
		res.status(422).json({ success: false, message: "Data wrong" });
	}
};
