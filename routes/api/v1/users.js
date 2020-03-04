const express = require("express");
const router = express.Router();

// load controller
const { index } = require("../../../controllers/index_controller");

// middlewares
let { catchErrors } = require("../../../config/errorHandler");
let { allAuth } = require("../../../middlewares/auth");
let { userValidation } = require("../../../middlewares/auth");

// routes
router.post("/register", catchErrors(index));
router.post("/login", catchErrors(login));
router.get("/profile/:id", catchErrors(index));

// export router
module.exports = router;
