const router = require('express').Router();
const ClassEnglishController = require('../controllers/ClassEnglishController')

router.post("/registerclass", ClassEnglishController.registerClass);

module.exports = router;
