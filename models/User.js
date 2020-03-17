const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const UserSchema = new mongoose.Schema(
	{
		name: { type: String, required: true },
		email: { type: String, required: true },
		phone: { type: Number, required: true },
		password: { type: String, required: true },
		isAdmin: { type: Boolean, default: false },
		otp: { type: String },
		isVerified: { type: Boolean, default: false }
	},
	{ timestamps: true }
);
UserSchema.methods.generateAuthToken = function() {
	const token = jwt.sign(
		{
			id: this._id,
			name: this.name,
			email: this.email,
			phone: this.phone,
			isAdmin: this.isAdmin,
			isVerified: this.isVerified
		},
		process.env.JWT_PRIVATE_KEY
	);
	return token;
};

module.exports = User = mongoose.model("User", UserSchema);
