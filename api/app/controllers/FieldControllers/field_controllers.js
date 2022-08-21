const Field = require("../../models/field_model");

const createField = (req, res) => {
    const field_data = req.body;

    const newField = new Field(field_data);

    newField.save()
        .then((result) => {
            const callback = {
                message: "Field created",
            };
            res.status(200).send(callback);
        })
        .catch((error) => {
            res.status(500).send(error);
        });
}

module.exports = {
    createField,
}