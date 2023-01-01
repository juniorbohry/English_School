const router = require('express').Router()
const LevelController = require('../controllers/LevelController')

router.post("/registerlevel", LevelController.registerLevel)
router.get("/", LevelController.getAllLevels)
router.get("/:id", LevelController.getLevelById)
router.delete("/:id", LevelController.removeLevelById)
router.patch("/:id", LevelController.updateLevelById)

module.exports = router


