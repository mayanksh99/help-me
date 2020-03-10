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
	deleteAid,
	getContacts,
	addContacts
} = require("../../../controllers/index_controller");

// middlewares
let { catchErrors } = require("../../../config/errorHandler");
let { allAuth } = require("../../../middlewares/auth");
let { contactValidation } = require("../../../middlewares/validations");

// routes
router.get("/precautions", catchErrors(getPrecautions));
router.post("/precautions", catchErrors(addPrecautions));
router.put("/precautions/:id", catchErrors(updatePrecautions));
router.delete("/precautions/:id", catchErrors(deletePrecautions));

router.get("/aid", catchErrors(getAid));
router.post("/aid", catchErrors(addAid));
router.put("/aid/:id", catchErrors(updateAid));
router.delete("/aid/:id", catchErrors(deleteAid));

router.get("/contacts", allAuth, catchErrors(getContacts));
router.post("/contacts", allAuth, contactValidation, catchErrors(addContacts));

// export router
module.exports = router;
