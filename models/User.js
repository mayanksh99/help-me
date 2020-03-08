const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
	{
		name: { type: String, required: true },
		email: { type: String, required: true },
		phone: { type: Number, required: true },
		password: { type: String, required: true },
		isAdmin: { type: Boolean, default: false },
		verifyEmail: { token: { type: String }, expires: { type: Date } }
	},
	{ timestamps: true }
);

module.exports = User = mongoose.model("User", UserSchema);
