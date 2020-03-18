const { sendError } = require("../utility/helpers");
const { BAD_REQUEST } = require("../utility/statusCodes");

let emailRegex = /^\S+@\S+\.\S+/,
	passwordRegex = /^[\S]{8,}/,
	contactRegex = /(^[6-9]{1}[0-9]{9}$)/;

module.exports.userValidation = (req, res, next) => {
	let { name, email, phone, password } = req.body;
	if (!name | !email | !password | !phone) {
		return sendError(res, "All fields are mandatory!!", BAD_REQUEST);
	}
	if (emailRegex.test(String(email))) {
		if (passwordRegex.test(String(password))) {
			return next();
		} else {
			return sendError(
				res,
				"Password must be atleast 8 character long!!",
				BAD_REQUEST
			);
		}
	} else {
		return sendError(res, "Not a valid email!!", BAD_REQUEST);
	}
};

module.exports.contactValidation = (req, res, next) => {
	let { contacts } = req.body;
	if (!contacts) {
		return sendError(res, "Contact can't be empty!!", BAD_REQUEST);
	}
	if (contactRegex.test(String(contacts))) {
		return next();
	} else {
		return sendError(res, "Not a valid contact!!", BAD_REQUEST);
	}
};

module.exports.locationValidation = (req, res, next) => {
	let { latitude, longitude } = req.body;
	if (!latitude || !longitude) {
		return sendError(res, "All fields are mandatory!!", BAD_REQUEST);
	}
	if (latitude <= 90 && latitude >= -90) {
		if (longitude <= 180 && longitude >= -180) {
			return next();
		} else {
			return sendError(
				res,
				"Longitude should be less than or equal to 180",
				BAD_REQUEST
			);
		}
	} else {
		return sendError(
			res,
			"Latitude should be less than or equal to 90",
			BAD_REQUEST
		);
	}
};

module.exports.otpValidation = (req, res, next) => {
	let { otp } = req.body;
	if (!otp) {
		return sendError(res, "OTP is required!!", BAD_REQUEST);
	} else {
		return next();
	}
};
