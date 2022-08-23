const Test = require("../../models/test_model");

const insert = (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");

    const data = req.body;

    const testData = new Test(data);

    testData.save()
        .then((result) => {
            const callback = {
                message: "Data inserted",
                result,
            };
            res.status(200).send(callback);
        })
        .catch((error) => {
            const callback = {
                message: "Data did not inserted",
                error,
            };
            res.status(500).send(callback);
        });
}

const read = (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");

    Test.find()
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
}

module.exports = {
    insert,
    read,
}