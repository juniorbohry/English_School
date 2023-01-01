const router = require('express').Router()
const PersonController = require('../controllers/PersonController')

router.post("/register", PersonController.registerPerson)
router.get("/allstudents", PersonController.getAllPersonStudent)
router.get("/allteachingstaff", PersonController.getAllPersonTeachingStaff)
router.get("/:id", PersonController.getPersonById)
router.delete("/:id", PersonController.removePersonById)
router.patch("/:id", PersonController.updatePersonById)

module.exports = router


