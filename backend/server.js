const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const PORT = 4000;
const apiRouter = require("./api/index");
const mongoose = require("mongoose");
// const expressValidator = require("express-validator");

mongoose
    .connect(process.env.DB_HOST, {
      useNewUrlParser: true,
      useCreateIndex: true
    })
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));
app.use(cors());
app.use(bodyParser.json());
// app.use(expressValidator());
app.use("/api", apiRouter);
app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});