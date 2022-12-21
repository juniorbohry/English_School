const router = require('express').Router();
const PersonController = require('../controllers/PersonController')

router.post("/register", PersonController.register);
router.get("/allstudents", PersonController.getAllPersonStudent);
router.get("/allteachingstaff", PersonController.getAllPersonTeachingStaff);
router.get("/:id", PersonController.getPersonById);

module.exports = router;


