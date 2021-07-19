const express = require("express");
const mongoose = require("mongoose");
// const router = require('express').Router();

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/deep-thoughts",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  }
);

// routes
const routes = require("./routes");
app.use(routes);

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
