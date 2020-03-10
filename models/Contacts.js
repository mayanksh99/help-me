const mongoose = require("mongoose");

const ContactSchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true
		},
		contacts: { type: Array, required: true }
	},
	{ timestamps: true }
);

module.exports = Contacts = mongoose.model("Contacts", ContactSchema);
