const express = require("express");

const controllers = require("../../controllers/TestControllers/test_controller");

const router = express.Router();

router.post('/test', controllers.test);
router.get('/read/:form_id', controllers.read);
router.post('/insert', controllers.insert);

module.exports = router;