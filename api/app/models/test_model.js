const {createModel} = require("../hooks/model_creator");

const fields = [
    {
        "_id": "630302817025ca8135b63162",
        "view": "Name",
        "name": "name",
        "type": "string",
        "required": true,
        "unique": false,
        "default": "Amir",
        "form": "6301fe35169546807cdd5f2f",
        "createdAt": "2022-08-22T04:13:53.156Z",
        "updatedAt": "2022-08-22T05:36:23.004Z",
        "__v": 0
    },
    {
        "_id": "630307ab7025ca8135b64ee3",
        "view": "Age",
        "name": "age",
        "type": "number",
        "required": true,
        "unique": false,
        "default": "20",
        "form": "6301fe35169546807cdd5f2f",
        "createdAt": "2022-08-22T04:35:55.989Z",
        "updatedAt": "2022-08-22T04:35:55.989Z",
        "__v": 0
    },
    {
        "_id": "630307bd7025ca8135b64f45",
        "view": "Email",
        "name": "email",
        "type": "string",
        "required": true,
        "unique": true,
        "default": "jon@due.com",
        "form": "6301fe35169546807cdd5f2f",
        "createdAt": "2022-08-22T04:36:13.941Z",
        "updatedAt": "2022-08-22T04:36:13.941Z",
        "__v": 0
    },
    {
        "_id": "630307d67025ca8135b64fc8",
        "view": "Phone",
        "name": "phone",
        "type": "number",
        "required": true,
        "unique": true,
        "default": "+1 315 27 4151",
        "form": "6301fe35169546807cdd5f2f",
        "createdAt": "2022-08-22T04:36:38.242Z",
        "updatedAt": "2022-08-22T04:36:38.242Z",
        "__v": 0
    },
    {
        "_id": "630307f87025ca8135b65082",
        "view": "Currently working",
        "name": "working",
        "type": "boolean",
        "required": true,
        "unique": false,
        "default": "false",
        "form": "6301fe35169546807cdd5f2f",
        "createdAt": "2022-08-22T04:37:12.969Z",
        "updatedAt": "2022-08-22T04:37:12.969Z",
        "__v": 0
    },
    {
        "_id": "630308127025ca8135b65107",
        "view": "Middle name",
        "name": "middle-name",
        "type": "string",
        "required": false,
        "unique": false,
        "default": "Lee",
        "form": "6301fe35169546807cdd5f2f",
        "createdAt": "2022-08-22T04:37:38.060Z",
        "updatedAt": "2022-08-22T04:37:38.060Z",
        "__v": 0
    }
]

const Test = createModel(fields);

module.exports = Test;