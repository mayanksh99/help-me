require("dotenv").config();

module.exports.getPrecautions = async (req, res) => {
	let data = await Precaution.find().sort({ createdAt: "desc" });
	res.status(200).json({ message: "success", error: false, data });
};
