const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	title: { type: String, required: true }
});

module.exports = User = mongoose.model("Precautions", UserSchema);
