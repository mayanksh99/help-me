const mongoose = require("mongoose");

const PrecautionSchema = new mongoose.Schema({
	title: { type: String, required: true },
	before: { type: String, required: true },
	during: { type: String, required: true },
	after: { type: String, required: true }
});

module.exports = Precaution = mongoose.model("Precautions", PrecautionSchema);
