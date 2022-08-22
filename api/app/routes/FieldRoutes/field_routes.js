const express = require("express");

const controllers = require("../../controllers/FieldControllers/field_controllers");

const router = express.Router();

router.post('/create', controllers.createField);
router.delete('/delete/:field_id', controllers.deleteField);

module.exports = router;