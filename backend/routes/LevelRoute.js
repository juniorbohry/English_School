const router = require('express').Router();
const LevelController = require('../controllers/LevelController')

router.post("/registerlevel", LevelController.registerLevel);
router.get("/", LevelController.getAllLevels);

module.exports = router;


