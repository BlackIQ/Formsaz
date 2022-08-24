const express = require("express");

const controllers = require("../../controllers/TestControllers/test_controller");

const router = express.Router();

router.post('/test', controllers.test);
router.get('/read', controllers.read);
router.post('/insert', controllers.read);

module.exports = router;