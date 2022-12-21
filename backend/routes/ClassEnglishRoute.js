const router = require('express').Router();
const ClassEnglishController = require('../controllers/ClassEnglishController')

router.post("/registerclass", ClassEnglishController.registerClass);
router.get("/", ClassEnglishController.getAllClass);
router.get("/allclassbasic", ClassEnglishController.getAllClassBasic);
router.get("/allclassintermediary", ClassEnglishController.getAllClassIntermediary);
router.get("/allclassadvanced", ClassEnglishController.getAllClassAdvanced);


module.exports = router;
