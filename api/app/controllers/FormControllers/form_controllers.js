const Form = require("../../models/form_model");
const Field = require("../../models/field_model");

const createForm = (req, res) => {
    const form_data = req.body;

    const newForm = new Form(form_data);

    newForm.save()
        .then((result) => {
            const callback = {
                message: "Form created",
                form: result,
            };
            res.status(200).send(callback);
        })
        .catch((error) => {
            res.status(500).send(error);
        });
}

const showForm = (req, res) => {
    const form_id = req.params.form_id;

    Form.findById(form_id)
        .then((formResult) => {
            Field.findOne({ form: formResult.id })
                .then((fieldResult) => {
                    const callback = {
                        form: formResult,
                        fields: fieldResult,
                    };
                    res.status(200).send(callback);
                })
                .catch((error) => {
                    const callback = {
                        message: "Error in fetch field",
                        error,
                    };
                    res.status(500).send(callback);
                });
        })
        .catch((error) => {
            const callback = {
                message: "Error in fetch form",
                error,
            };
            res.status(500).send(callback);
        });
}

module.exports = {
    createForm,
    showForm,
}