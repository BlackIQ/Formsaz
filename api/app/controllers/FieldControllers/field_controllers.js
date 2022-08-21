const Field = require("../../models/field_model");

const createField = (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");

    const field_data = req.body;

    const newField = new Field(field_data);

    newField.save()
        .then((result) => {
            const callback = {
                message: "Field created",
                field: result,
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