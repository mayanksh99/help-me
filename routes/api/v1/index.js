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
	addContacts,
	removeContacts,
	getLocation,
	addLocation,
	removeLocation,
	verifyEmail
} = require("../../../controllers/index_controller");

// middlewares
let { catchErrors } = require("../../../config/errorHandler");
let { allAuth, adminAuth } = require("../../../middlewares/auth");
let {
	contactValidation,
	locationValidation,
	otpValidation
} = require("../../../middlewares/validations");

// routes
router.get("/precautions", catchErrors(getPrecautions));
router.post("/precautions", adminAuth, catchErrors(addPrecautions));
router.put("/precautions/:id", adminAuth, catchErrors(updatePrecautions));
router.delete("/precautions/:id", adminAuth, catchErrors(deletePrecautions));

router.get("/aid", catchErrors(getAid));
router.post("/aid", adminAuth, catchErrors(addAid));
router.put("/aid/:id", adminAuth, catchErrors(updateAid));
router.delete("/aid/:id", adminAuth, catchErrors(deleteAid));

router.get("/contacts", allAuth, catchErrors(getContacts));
router.post("/contacts", allAuth, contactValidation, catchErrors(addContacts));
router.delete("/contacts", allAuth, catchErrors(removeContacts));

router.get("/location/:trackId", allAuth, catchErrors(getLocation));
router.post("/location", allAuth, locationValidation, catchErrors(addLocation));
router.delete("/location", allAuth, catchErrors(removeLocation));

router.post("/verify", allAuth, otpValidation, catchErrors(verifyEmail));
// export router
module.exports = router;
