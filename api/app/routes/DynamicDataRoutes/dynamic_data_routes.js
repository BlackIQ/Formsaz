const express = require("express");

const controllers = require("../../controllers/DynamicDataControllers/dynamic_data_controllers");

const router = express.Router();

router.post('/init', controllers.init);
router.get('/read/:form_id', controllers.read);
router.post('/insert', controllers.insert);

module.exports = router;