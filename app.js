let express = require("express");
let mongoose = require("mongoose");

// route
let registerRoute=require("./routes/registerRoute")

module.exports = function create_app(mongoURL) {
	let app = express();
	return new Promise(async (resolve) => {
		app.use(express.json());
		app.use(express.urlencoded({ extended: true }));
		await mongoose.connect(mongoURL, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			// solve DeprecationWarning
			useCreateIndex:true
		});
		app.use("/api",registerRoute)
		resolve(app);
	});
};
