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


module.exports = {
    modelType,
}