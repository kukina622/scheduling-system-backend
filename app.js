let express = require("express");
let mongoose = require("mongoose");

// route
let registerRoute = require("./routes/registerRoute");
let loginRoute = require("./routes/loginRoute");

module.exports = function create_app(mongoURL,serect_key) {
	let app = express();
	return new Promise(async (resolve) => {
		app.use(express.json());
		app.use(express.urlencoded({ extended: true }));
		await mongoose.connect(mongoURL, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			// solve DeprecationWarning
			useCreateIndex: true,
		});
		app.set("serect_key",serect_key)
		app.use("/api", registerRoute);
		app.use("/api", loginRoute);
		resolve(app);
	});
};
