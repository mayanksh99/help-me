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

module.exports.updatePrecautions = async (req, res) => {
	let _id = req.params.id;
	let { before, during, after } = req.body;
	let data = await Precaution.findOne({ _id });
	if (data) {
		data.before = before;
		data.during = during;
		data.after = after;
		await data.save();
		data = await Precaution.findOne({ _id });
		res.status(200).json({ message: "success", error: false, data });
	}
};

module.exports.deletePrecautions = async (req, res) => {
	let _id = req.params.id;
	let data = await Precaution.findOne({ _id });
	if (data) {
		await data.delete();
		res.status(200).json({ message: "success", error: false, data: null });
	} else {
		res.status(400).json({
			message: "Invalid data",
			error: false,
			data: null
		});
	}
};

module.exports.getAid = async (req, res) => {
	let data = await FirstAid.find().sort({ createdAt: "desc" });
	res.status(200).json({ message: "success", error: false, data });
};

module.exports.addAid = async (req, res) => {
	let { woundType } = req.body;
	let prevData = await FirstAid.find({ woundType });
	if (prevData != "") {
		res.status(200).json({ message: "Already added", error: false });
	} else {
		let newData = req.body;
		let data = await FirstAid.create(newData);
		res.status(200).json({ message: "success", error: false, data });
	}
};

module.exports.updateAid = async (req, res) => {
	let _id = req.params.id;
	let { woundType, treatment } = req.body;
	let data = await FirstAid.findOne({ _id });
	if (data) {
		data.woundType = woundType;
		data.treatment = treatment;
		await data.save();
		data = await FirstAid.findOne({ _id });
		res.status(200).json({ message: "success", error: false, data });
	}
};

module.exports.deleteAid = async (req, res) => {
	let _id = req.params.id;
	let data = await FirstAid.findOne({ _id });
	if (data) {
		await data.delete();
		res.status(200).json({ message: "success", error: false, data: null });
	} else {
		res.status(400).json({
			message: "Invalid data",
			error: false,
			data: null
		});
	}
};
