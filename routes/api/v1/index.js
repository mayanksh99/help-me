const express = require("express");
const router = express.Router();

// load controller
const {
	getPrecautions,
	addPrecautions
} = require("../../../controllers/index_controller");

// middlewares
let { catchErrors } = require("../../../config/errorHandler");
let { allAuth } = require("../../../middlewares/auth");

// routes
router.get("/precautions", catchErrors(getPrecautions));
router.post("/precautions", catchErrors(addPrecautions));

// export router
module.exports = router;
