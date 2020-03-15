const mongoose = require("mongoose");

const LocationSchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true
		},
		coordinate: {
			type: Array,
			required: true
		},
		trackId: { type: String, required: true }
	},
	{ timestamps: true }
);
module.exports = Location = mongoose.model("Location", LocationSchema);
