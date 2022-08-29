const mongoose = require("mongoose");

const Form = require("../../models/form_model");
const Field = require("../../models/field_model");

const models = mongoose.models;

const data_type = [
    {
        db_type: "string",
        model_type: String,
    },
    {
        db_type: "number",
        model_type: Number,
    },
    {
        db_type: "boolean",
        model_type: Boolean,
    },
];

const modelType = (db_type) => {
    return data_type.filter(type => type.db_type === db_type)[0].model_type;
}

const init = (req, res) => {
    const {form_id} = req.body;

    Form.findById(form_id)
        .then((form_result) => {
            Field.find({form: form_result._id})
                .then((fields_result) => {
                    if (!models[form_result.name]) {
                        let stuff = {};
                        let newData = {};

                        fields_result.map((field) => {
                            stuff[field.name] = {
                                type: modelType(field.type),
                                default: field.default,
                                required: field.required,
                                unique: field.unique,
                            };

                            newData[field.name] = field.type === "string" ? `Test item for ${field.name}` : field.type === 'number' ? 1 : true;
                        });

                        const Schema = mongoose.Schema;

                        const generatedModelSchema = new Schema(
                            stuff,
                            {
                                timestamps: true,
                            },
                        );

                        const generatedModel = mongoose.model(form_result.name, generatedModelSchema);

                        const insertData = new generatedModel(newData);

                        insertData.save()
                            .then((result) => {
                                generatedModel.findByIdAndDelete(result.id)
                                    .then((done_result) => res.status(200).send({message: "Model created"}))
                                    .catch((error) => res.status(500).send({message: "Faild create model", error}));
                            })
                            .catch((error) => res.status(500).send({message: "Faild to insert data", error}));
                    } else res.status(200).send({message: "Model exists"});
                })
                .catch((error) => res.status(500).send({message: "Faild get fields result", error}));
        })
        .catch((error) => res.status(500).send({message: "Faild get form result", error}));
}

const insert = (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");

    const {form_id, data} = req.body;

    Form.findById(form_id)
        .then((form_result) => {
            Field.find({form: form_result._id})
                .then((fields_result) => {
                        // const dynamicalModel = models[form_result.name];
                        // const newRecord = new dynamicalModel(data);

                        // newRecord.save()
                        //     .then((result) => res.status(200).send({message: "Record inserted", result}))
                        //     .catch((error) => res.status(500).send({message: "Record did not inserted", error}));

                    const errors = [];

                    fields_result.map((field) => {
                        const db_item = field.name;

                        Object.entries(data).map(([k,v]) => {
                            if (db_item === k) {
                                if (field.required === true) {
                                    if (v === '') {
                                        errors.push(
                                            {
                                                field: field.view,
                                                content: `${field.view} is required.`
                                            }
                                        );
                                    }
                                }
                                
                                if (field.unique === true) {
                                    Field.find({ db_item: v })
                                        .then((result) => {
                                            if (result.length === 0) {
                                                errors.push(
                                                    {
                                                        field: field.view,
                                                        content: `${field.view} is unique.`
                                                    }
                                                );
                                            }
                                        })
                                        .catch((error) => res.send(error));
                                }
                            };
                        });
                    })

                    if (errors.length === 0) {
                        const dynamicalModel = models[form_result.name];
                        const newRecord = new dynamicalModel(data);

                        newRecord.save()
                            .then((result) => res.status(200).send({message: "Record inserted", result}))
                            .catch((error) => res.status(500).send({message: "Record did not inserted", error}));
                    } else res.send(errors);
                })
                .catch((error) => res.status(500).send({message: "Faild get fields result", error}));
        })
        .catch((error) => res.status(500).send({message: "Faild get form result", error}));
}

const read = (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");

    const {form_id} = req.params;

    Form.findById(form_id)
        .then((form_result) => {
            const dynamicalModel = models[form_result.name];

            dynamicalModel.find()
                .then((result) => res.status(200).send(result))
                .catch((error) => res.status(500).send({message: "Can not read", error}))
        })
        .catch((error) => res.status(500).send({message: "Faild get form result", error}));
}

module.exports = {
    insert,
    read,
    init,
}