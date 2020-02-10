// Dependencies
var express = require("express");
var mongooose = require("mongoose");

// Initialize Express
var app = express();

// Set up a static folder (public) for our web app
app.use(express.static("public"));

// Database configuration
// Save the URL of our database as well as the name of our collection
var databaseUrl = "";
var collections = [""];

// Use mongojs to hook the database to the db variable
var db = mongojs(databaseUrl, collections);

// This makes sure that any errors are logged if mongodb runs into an issue
db.on("error", function(error) {
  console.log("Database Error:", error);
});

// Routes
// 1. At the root path, send a simple hello world message to the browser
app.get("/", function(req, res) {
    res.send("Hello world");
  });
  



// Set the app to listen on port 3000
app.listen(3000, function() {
    console.log("App running on port 3000!");
  });  