const express = require("express");

const controllers = require("../../controllers/FormControllers/form_controllers");

const router = express.Router();

router.get('/all', controllers.allForms);
router.get('/get/:form_id', controllers.showForm);
router.post('/create', controllers.createForm);
router.delete('/delete/:form_id', controllers.deleteForm);

module.exports = router;