//Create a web-based personal finance tracker using JavaScript, HTML, and CSS. The application should allow users to add, edit, and delete income and expense transactions and display the current balance.
//give me the complete code for the index.js file
//index.js
// Require node modules
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();

// Set up body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Set up static directory
app.use(express.static(path.join(__dirname, "public")));

// set up mongoose connection
const mongoose = require("mongoose");
const mongoDBUrl =
  "mongodb+srv://arnavprakash:nicedatabase123@cluster1.bbkvpc6.mongodb.net/?retryWrites=true&w=majority"; // Replace with your MongoDB connection string

mongoose
  .connect(mongoDBUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDB connected");
    // Continue with defining models and performing database operations
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

// Set up routes
const routes = require("./routes/index");
app.use("/", routes);

// Set up view engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Listen on port 3000
app.listen(3000, () => {
  console.log("Server started on port 3000");
});
