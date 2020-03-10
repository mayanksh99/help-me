const { sendError } = require("../utility/helpers");
const { BAD_REQUEST } = require("../utility/statusCodes");

let emailRegex = /^\S+@\S+\.\S+/,
	passwordRegex = /^[\S]{8,}/,
	contactRegex = /^(?:(?:\+|0{0,2})91(\s*[\ -]\s*)?|[0]?)?[789]\d{9}|(\d[ -]?){10}\d$/;

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
	//not get valid regex till now
	if (contactRegex.test(String(contacts))) {
		return next();
	} else {
		return sendError(res, "Not a valid contact!!", BAD_REQUEST);
	}
};
