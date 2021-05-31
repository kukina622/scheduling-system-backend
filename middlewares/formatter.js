/**
 * Login form data type
 * @param {String} sid
 * @param {String} password
 */
module.exports.login = function (req, res, next) {
	req.body.sid = String(req.body.sid);
	req.body.password = String(req.body.password);
	next();
};

/**
 * Register form data type
 * @param {String} sid
 * @param {String} username
 * @param {String} password
 */
module.exports.register = function (req, res, next) {
	req.body.sid = String(req.body.sid);
	req.body.username = String(req.body.username);
	req.body.password = String(req.body.password);
	next();
};
