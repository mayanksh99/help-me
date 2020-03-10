const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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
		let salt = await bcrypt.genSalt(10);
		newUser["password"] = await bcrypt.hash(password, salt);
		user = await User.create(newUser);
		const token = jwt.sign({ user }, process.env.JWT_PRIVATE_KEY);
		res.status(201)
			.header("x-auth-token", token)
			.json({
				message: "successfully registered",
				error: false,
				data: user
			});
	}
};

module.exports.login = async (req, res) => {
	let { email, password } = req.body;
	let user = await User.findOne({ email: { $regex: email, $options: "i" } });
	if (user) {
		let passValidation = await bcrypt.compare(
			String(password),
			String(user.password)
		);
		if (passValidation) {
			const token = jwt.sign({ user }, process.env.JWT_PRIVATE_KEY);
			res.status(201)
				.header("x-auth-token", token)
				.json({
					message: "Login successfully",
					error: false,
					data: user
				});
		} else {
			res.status(403).json({
				message: "Invalid password",
				error: true,
				data: null
			});
		}
	} else {
		res.status(401).json({
			message: "Invalid user",
			error: true,
			data: null
		});
	}
};

module.exports.profile = async (req, res) => {
	let user = await User.findById(req.params.id);
	if (user) {
		res.status(200).json({ message: "success", error: false, data: user });
	} else {
		res.status(400).json({
			message: "No user found",
			error: true,
			data: null
		});
	}
};
