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
		verifyEmail: { token: { type: String }, expires: { type: Date } }
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
			isAdmin: this.isAdmin
		},
		process.env.JWT_PRIVATE_KEY
	);
	return token;
};

module.exports = User = mongoose.model("User", UserSchema);
