const Form = require("../../models/form_model");
const Field = require("../../models/field_model");

const createForm = (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");

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

const allForms = (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");

    Form.find()
        .then((forms) => {
            res.status(200).send(forms);
        })
        .catch((error) => {
            const callback = {
                message: "Error to fetch forms",
                error
            };
            res.status(200).send(callback);
        });
}

const showForm = (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");

    const {form_id} = req.params;

    Form.findById(form_id)
        .then((formResult) => {
            Field.find({ form: form_id })
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

const deleteForm = (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");

    const {form_id} = req.params;

    Form.findByIdAndDelete(form_id)
        .then((result) => {
            Field.deleteMany({ form: form_id })
                .then((done_result) => {
                    const callback = {
                        message: "Form deleted",
                    };
                    res.status(200).send(callback);
                })
                .catch((error) => {
                    const callback = {
                        message: "Failed to delete form",
                        error,
                    };
                    res.status(500).send(callback);
                });
        })
        .catch((error) => {
            const callback = {
                message: "Failed to delete form",
                error,
            };
            res.status(500).send(callback);
        });
}

module.exports = {
    createForm,
    allForms,
    showForm,
    deleteForm,
}