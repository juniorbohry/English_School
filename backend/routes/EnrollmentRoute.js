const router = require('express').Router();
const EnrollmentController = require('../controllers/EnrollmentController')

router.post("/registerenrollment", EnrollmentController.registerEnrollment);
router.get("/", EnrollmentController.getAllEnrollments);
router.get("/allactiveenrollments", EnrollmentController.getAllActiveEnrollments);
router.get("/allinactiveenrollments", EnrollmentController.getAllInactiveEnrollments);
router.get("/:id", EnrollmentController.getEnrollmentById);
router.delete("/:id", EnrollmentController.removeEnrollmentById);



module.exports = router;


