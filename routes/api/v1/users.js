const express = require("express");
const router = express.Router();

// load controller
const { register } = require("../../../controllers/user_controller");

// middlewares
let { catchErrors } = require("../../../config/errorHandler");
// let { allAuth } = require("../../../middlewares/auth");
// let { userValidation } = require("../../../middlewares/auth");

// routes
router.post("/register", catchErrors(register));
// router.post("/login", catchErrors(login));
// router.get("/profile/:id", catchErrors(index));

// export router
module.exports = router;
