const express = require("express");
const cors = require("cors");

const FieldRoutes = require("./routes/FieldRoutes/field_routes");
const FormRoutes = require("./routes/FormRoutes/form_routes");

const app = express();

app.set('json spaces', 2);
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(cors());

app.use('/api/field', FieldRoutes);
app.use('/api/form', FormRoutes);

module.exports = app;