let mongoose = require("mongoose");

let userSchema = new mongoose.Schema({
	sid: {
		type: String,
		match: /^[A-Z][0-9]{8}$/,
		required: true,
		unique: true,
		uppercase:true
	},
	username: {
		type: String,
		require: true,
	},
	password: {
		type: String,
		validate: (v) => {
			return v.length === 64;
		},
		require: true,
	},
	shiftTime: {
		type: [Number],
		enum: [1, 2, 3, 4, 5, 6, 7],
		default: [],
	},
});

module.exports = mongoose.model("userModel", userSchema);
