const mongoose = require("mongoose");

const Form = require("../models/form_model");
const Field = require("../models/field_model");

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

// class ModelCreator {
//     constructor(form_id) {
//         this.form_id = form_id;
//     }
//
//     createField = () => {
//         return Field.find({form: this.form_id})
//             .then((fieldResult) => fieldResult)
//             .catch((error) => error);
//     }
//
//     modelType = (db_type) => {
//         return data_type.filter(type => type.db_type === db_type)[0].model_type;
//     }
//
//     createModel = () => {
//         return Form.findById(this.form_id)
//             .then((result) => {
//                 const Schema = mongoose.Schema;
//
//                 const generatedMode = new Schema(
//                     // fields.map((field) => ({
//                     //     name: createItem(field),
//                     // })),
//                     {
//                         name: {
//                             type: this.modelType("string"),
//                             default: "",
//                             required: true,
//                         },
//                     },
//                     {
//                         timestamps: true,
//                     },
//                 );
//
//                 return mongoose.model(result.name, generatedMode);
//             })
//             .catch((error) => {
//                 return error;
//             });
//     }
// }

module.exports = {
    // ModelCreator,
    modelType,
}