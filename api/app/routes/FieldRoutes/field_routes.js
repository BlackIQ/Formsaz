const express = require("express");

const controllers = require("../../controllers/FieldControllers/field_controllers");

const router = express.Router();

router.post('/create', controllers.createField);
router.put('/update', controllers.updateField);
router.delete('/delete/:field_id', controllers.deleteField);

module.exports = router;