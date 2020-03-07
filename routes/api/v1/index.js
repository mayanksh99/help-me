const express = require("express");
const router = express.Router();

// load controller
const {
	getPrecautions,
	addPrecautions,
	updatePrecautions,
	deletePrecautions,
	getAid,
	addAid,
	updateAid,
	deleteAid
} = require("../../../controllers/index_controller");

// middlewares
let { catchErrors } = require("../../../config/errorHandler");
let { allAuth } = require("../../../middlewares/auth");

// routes
router.get("/precautions", catchErrors(getPrecautions));
router.post("/precautions", catchErrors(addPrecautions));
router.put("/precautions/:id", catchErrors(updatePrecautions));
router.delete("/precautions/:id", catchErrors(deletePrecautions));

router.get("/aid", catchErrors(getAid));
router.post("/aid", catchErrors(addAid));
router.put("/aid/:id", catchErrors(updateAid));
router.delete("/aid/:id", catchErrors(deleteAid));

// export router
module.exports = router;
