const mongoose = require("mongoose");
const app = require("./app/app");

require("dotenv").config();
const env = process.env;

mongoose.connect(env.MONGO_URL)
    .then((connection) => {
        const port = env.PORT;
        app.listen(port, () => console.log(`App is running on ${port}`))
    })
    .catch((error) => console.log(error));