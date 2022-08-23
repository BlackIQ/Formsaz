const Field = require("../../models/field_model");
const Test = require("../../models/test_model");

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

const deleteField = (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");

    const {field_id} = req.params;

    Field.findByIdAndDelete(field_id)
        .then((result) => {
            const callback = {
                message: "Field deleted",
            };
            res.status(200).send(callback);
        })
        .catch((error) => {
            const callback = {
                message: "Failed to delete",
                error,
            };
            res.status(500).send(callback);
        })
}

const updateField = (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");

    const {field_id, update_data} = req.body;

    Field.findByIdAndUpdate(field_id, update_data)
        .then((result) => {
            const callback = {
                message: "Field updated",
            };
            res.status(200).send(callback);
        })
        .catch((error) => {
            const callback = {
                message: "Failed to update",
                error,
            };
            res.status(500).send(callback);
        })
}

const testModel = (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");

    const test = new Test(
        {
            name: "Amir",
        }
    );

    test.save()
        .then((result) => res.send(result))
        .catch((error) => res.send(error));
}

module.exports = {
    createField,
    deleteField,
    updateField,

    testModel,
}