const mongoose = require("mongoose");

const Form = require("../../models/form_model");
const Field = require("../../models/field_model");

const {modelType} = require("../../hooks/model_creator");

const test = (req, res) => {
    const {form_id} = req.body;

    Form.findById(form_id)
        .then((form_result) => {
            Field.find({form: form_result._id})
                .then((fields_result) => {

                    let stuff = {};

                    fields_result.map((field) => {
                        stuff[field.name] = {
                            type: modelType(field.type),
                            default: field.default,
                            required: field.required,
                            unique: field.unique,
                        };
                    });

                    const Schema = mongoose.Schema;

                    const generatedModelSchema = new Schema(
                        stuff,
                        {
                            timestamps: true,
                        },
                    );

                    const generatedModel = mongoose.model(form_result.name, generatedModelSchema);

                    res.status(200).send({message: "Done"});
                })
                .catch((error) => res.status(500).send(error));
        })
        .catch((error) => res.status(500).send(error));
}

const insert = (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    //
    // const data = req.body;
    // const testData = new Test(data);
    //
    // testData.save()
    //     .then((result) => {
    //         const callback = {
    //             message: "Data inserted",
    //             result,
    //         };
    //         res.status(200).send(callback);
    //     })
    //     .catch((error) => {
    //         const callback = {
    //             message: "Data did not inserted",
    //             error,
    //         };
    //         res.status(500).send(callback);
    //     });
}

const read = (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");

    const {form_id} = req.param;

    Form.findById(form_id)
        .then((form_result) => {
            Field.find({form: form_result._id})
                .then((fields_result) => {

                    let stuff = {};

                    fields_result.map((field) => {
                        stuff[field.name] = {
                            type: modelType(field.type),
                            default: field.default,
                            required: field.required,
                            unique: field.unique,
                        };
                    });

                    const Schema = mongoose.Schema;

                    const generatedModelSchema = new Schema(
                        stuff,
                        {
                            timestamps: true,
                        },
                    );

                    const generatedModel = mongoose.model(form_result.name, generatedModelSchema);


                    generatedModel.find()
                        .then((result) => {
                            res.status(200).send(result);
                        })
                        .catch((error) => {
                            const callback = {
                                message: "Failed to get data",
                                error,
                            };
                            res.status(500).send(callback);
                        });
                })
                .catch((error) => res.status(500).send(error));
        })
        .catch((error) => res.status(500).send(error));
}

module.exports = {
    insert,
    read,
    test,
}