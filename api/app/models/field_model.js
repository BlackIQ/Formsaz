const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const fieldModel = new Schema(
    {
        view: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            required: true,
        },
        required: {
            type: Boolean,
            required: true,
        },
        unique: {
            type: Boolean,
            required: true,
        },
        default: {
            type: String,
            required: true,
        },
        form: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    },
);

const Field = mongoose.model('field', fieldModel);

module.exports = Field;