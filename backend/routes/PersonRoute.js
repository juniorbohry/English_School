const router = require('express').Router();
const PersonController = require('../controllers/PersonController')

router.post("/register", PersonController.register);

module.exports = router;


