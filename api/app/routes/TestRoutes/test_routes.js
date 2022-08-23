const express = require("express");

const controllers = require("../../controllers/TestControllers/test_controller");

const router = express.Router();

router.get('/read', controllers.read);
router.post('/insert', controllers.read);

module.exports = router;