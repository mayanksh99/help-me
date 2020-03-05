module.exports.getPrecautions = async (req, res) => {
	let data = await Precaution.find().sort({ createdAt: "desc" });
	res.status(200).json({ message: "success", error: false, data });
};

module.exports.addPrecautions = async (req, res) => {
	let { title } = req.body;
	let prevData = await Precaution.find({ title });
	if (prevData != "") {
		res.status(200).json({ message: "Already added", error: false });
	} else {
		let newData = req.body;
		let data = await Precaution.create(newData);
		res.status(200).json({ message: "success", error: false, data });
	}
};
