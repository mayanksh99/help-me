const mongoose = require("mongoose");

const PrecautionSchema = new mongoose.Schema({
    title: { type: String, required: true },
    before: { type: Array, required: true },
    during: { type: Array, required: true },
    after: { type: Array, required: true }
});

module.exports = Precaution = mongoose.model("Precautions", PrecautionSchema);