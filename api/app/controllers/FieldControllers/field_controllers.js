const Field = require("../../models/field_model");

const createField = (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");

    const field_data = req.body;

    const newField = new Field(field_data);

    newField.save()
        .then((result) => res.status(200).send({message: "Field created", field: result}))
        .catch((error) => res.status(500).send({message: "Failed to create", error}));
}

const deleteField = (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");

    const {field_id} = req.params;

    Field.findByIdAndDelete(field_id)
        .then((result) => res.status(200).send({message: "Field deleted"}))
        .catch((error) => res.status(500).send({message: "Failed to delete", error}));
}

const updateField = (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");

    const {field_id, update_data} = req.body;

    Field.findByIdAndUpdate(field_id, update_data)
        .then((result) => res.status(200).send({message: "Field updated"}))
        .catch((error) => res.status(500).send({message: "Failed to update", error}));
}

module.exports = {
    createField,
    deleteField,
    updateField,
}