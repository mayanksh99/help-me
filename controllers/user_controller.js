const bcrypt = require("bcryptjs");

module.exports.register = async (req, res) => {
	let { name, email, phone, password } = req.body;
	let user = await User.findOne({
		email: { $regex: email, $options: "i" }
	});
	if (user) {
		res.status(400).json({
			message: "Email already registerd",
			error: true,
			data: null
		});
	} else {
		let newUser = {
			name: String(name).trim(),
			email: String(email).trim(),
			phone: Number(phone)
		};
		let pass;
		let salt = await bcrypt.genSalt(10);
		newUser["password"] = await bcrypt.hash(password, salt);
		console.log(newUser);
	}
};
