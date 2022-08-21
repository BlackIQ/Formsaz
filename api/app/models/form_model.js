const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const formModel = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    },
);

const Form = mongoose.model('form', formModel);

module.exports = Form;