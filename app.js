let express = require("express");
let mongoose = require("mongoose");

module.exports = function create_app(mongoURL) {
	let app = express();
	return new Promise(async (resolve) => {
		app.use(express.json());
		app.use(express.urlencoded({ extended: true }));
		await mongoose.connect(mongoURL, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		resolve(app);
	});
};
