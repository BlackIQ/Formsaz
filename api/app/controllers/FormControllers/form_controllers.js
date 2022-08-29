const Form = require("../../models/form_model");
const Field = require("../../models/field_model");

const createForm = (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");

    const form_data = req.body;

    const newForm = new Form(form_data);

    newForm.save()
        .then((result) => res.status(200).send({message: "Form created", form: result}))
        .catch((error) => res.status(500).send({message: "Faild to save form", error}));
}

const allForms = (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");

    Form.find()
        .then((forms) => res.status(200).send(forms))
        .catch((error) => res.status(200).send({message: "Error to fetch forms", error}));
}

const showForm = (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");

    const {form_id} = req.params;

    Form.findById(form_id)
        .then((formResult) => {
            Field.find({ form: form_id })
                .then((fieldResult) => res.status(200).send({form: formResult, fields: fieldResult}))
                .catch((error) => res.status(500).send({message: "Error in fetch field", error}));
        })
        .catch((error) => res.status(500).send({message: "Error in fetch form", error}));
}

const deleteForm = (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");

    const {form_id} = req.params;

    Form.findByIdAndDelete(form_id)
        .then((result) => {
            Field.deleteMany({ form: form_id })
                .then((done_result) => res.status(200).send({message: "Form deleted"}))
                .catch((error) => res.status(500).send({message: "Failed to delete form", error}));
        })
        .catch((error) => res.status(500).send({message: "Failed to delete form", error}));
}

module.exports = {
    createForm,
    allForms,
    showForm,
    deleteForm,
}