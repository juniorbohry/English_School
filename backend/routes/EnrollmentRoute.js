const router = require('express').Router();
const EnrollmentController = require('../controllers/EnrollmentController')

router.post("/registerEnrollment", EnrollmentController.registerEnrollment);

module.exports = router;


