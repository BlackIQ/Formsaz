const mongoose = require("mongoose");

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

const returnModelType = (db_type) => {
    return data_type.filter(type => type.db_type === db_type)[0].model_type;
}

const createItem = (field) => {
    return {
        type: returnModelType(field.type),
        required: field.required,
        unique: field.unique,
        default: field.default,
    };
}

const createModel = (fields) => {
    const {name} = fields;
    const Schema = mongoose.Schema;

    const testModel = new Schema(
        fields.map((field) => ({
            name: createItem(field),
        })),
        {
            timestamps: true,
        },
    );

    return mongoose.model('test', testModel);
}

module.exports = {
    createModel,
}