const mongoose = require("mongoose");

const FirstAidSchema = new mongoose.Schema({
	woundType: { type: String, required: true },
	treatment: { type: Array, required: true }
});

module.exports = FirstAid = mongoose.model("FirstAid", FirstAidSchema);
