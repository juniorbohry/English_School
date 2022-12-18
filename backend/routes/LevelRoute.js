const router = require('express').Router();
const LevelController = require('../controllers/LevelController')

router.post("/registerlevel", LevelController.registerLevel);

module.exports = router;


