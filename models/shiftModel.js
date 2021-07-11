let mongoose = require("mongoose");

let shiftSchema = new mongoose.Schema({
  user_1: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "userModel",
  },
  shiftDate_1: { // user_1原本的日期
    type: Date,
    required: true,
  },
  user_2: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "userModel",
  },
  shiftDate_2: { // user_2原本的日期
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model("shiftModel", shiftSchema);
