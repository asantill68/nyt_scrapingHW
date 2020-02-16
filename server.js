// Dependencies
var express = require("express");
var mongoose = require("mongoose");
var expressHandlebars = require("express-handlebars");
var bodyParser = require("body-parser");

//  Set up our port to be either the host's designated port or 3000
var PORT = process.env.PORT || 3000;

// Initialize Express
var app = express();

//  Set up express router
var router = express.Router();

// Set up a static folder (public) for our web app
app.use(express.static(__dirname + "/public"));

//  Connect Handlebars to our Express app
app.engine("handlebars", expressHandlebars({
  defaultLayout:"main"
}));
app.set("view engine", "handlebars");

//  Use body-parser in our app
app.use(bodyParser.urlencoded({
  extended:false
}));

//  Have every request go through our router middleware
app.use(router);

//  Require our routes file pass our router objec
require("./config/routes")(router);

//  If Deployed, use the deploye database.  Otherwise use the local mongoHeadlines database
var db = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

//  Connect mongoose to our database
mongoose.connect(db, function(error){
  if(error){
    console.log(error);
  }else{
    console.log("mongoose connection is successful");
  }
})


// Set the app to listen on port 3000
app.listen(PORT, function() {
  console.log("App running on: " + PORT);
});


  



