const { sendError } = require("../utility/helpers");
const { BAD_REQUEST } = require("../utility/statusCodes");

let emailRegex = /^\S+@\S+\.\S+/,
	passwordRegex = /^[\S]{8,}/;

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
