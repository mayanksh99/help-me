const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");

module.exports.generateCode = length => {
	let chars = "0123456789";
	let code = "";
	for (let i = 0; i < length; i++) {
		code += chars[Math.round(Math.random() * (chars.length - 1))];
	}
	return code;
};

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
		let code = this.generateCode(6);
		let Email = String(email).trim();
		let transporter = nodemailer.createTransport({
			service: "gmail",
			auth: {
				user: process.env.EMAIL, // generated ethereal user
				pass: process.env.PASS // generated ethereal password
			}
		});

		// send mail with defined transport object
		let info = await transporter.sendMail({
			from: '"Help Me" <devsdsckiet@gmail.com>', // sender address
			to: Email, // list of receivers
			subject: "OTP sent", // Subject line
			text: `Welcome, Here is your otp ${code}`, // plain text body
			html: `<b>Welcome, Here is your otp ${code}</b>` // html body
		});

		let newUser = {
			name: String(name).trim(),
			email: String(email).trim(),
			phone: Number(phone),
			otp: Number(code)
		};
		let salt = await bcrypt.genSalt(10);
		newUser["password"] = await bcrypt.hash(password, salt);
		user = await User.create(newUser);
		const token = user.generateAuthToken();
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
			const token = user.generateAuthToken();
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
	let { name, email, phone } = req.user;
	let user = { name, email, phone };
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
