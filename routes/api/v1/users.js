const express = require("express");
const router = express.Router();

// load controller
const {
	register,
	login,
	profile
} = require("../../../controllers/user_controller");

// middlewares
let { catchErrors } = require("../../../config/errorHandler");
let { allAuth } = require("../../../middlewares/auth");
let { userValidation } = require("../../../middlewares/validations");

// routes
router.post("/register", userValidation, catchErrors(register));
router.post("/login", catchErrors(login));
router.get("/profile", allAuth, catchErrors(profile));

// export router
module.exports = router;
