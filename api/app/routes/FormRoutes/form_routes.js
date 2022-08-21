const express = require("express");

const controllers = require("../../controllers/FormControllers/form_controllers");

const router = express.Router();

router.post('/create', controllers.createForm);
router.get('/all', controllers.allForms);
router.get('/get/:form_id', controllers.showForm);

module.exports = router;