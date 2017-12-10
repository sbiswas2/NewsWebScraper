// Dependencies
var express = require("express");
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var request = require('request');
var cheerio = require('cheerio');

// Initialize express
var app = express();

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: false }))

// Express-Handlebars
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Mongoose Database Configuration
if(process.env.NODE_ENV == 'production'){
  mongoose.connect('mongodb://heroku_rh7fjtn1:9ot6td4bvl8voeu1doi0usqk8j@ds033196.mlab.com:33196/heroku_rh7fjtn1');
}
else{
  mongoose.connect('mongodb://localhost/scraper');
}
var db = mongoose.connection;

// if mongoose error
db.on('error', function(err) {
  console.log('Mongoose Error: ', err);
});

// if mongoose successful
db.once('open', function() {
  console.log('Mongoose Connected');
});

// Import the comment and article models
var Comment = require('./models/comment.js');
var Article = require('./models/article.js');

// Import router
var router = require('./controllers/controller.js');
app.use('/', router);

// Initialize App
var PORT = process.env.PORT || 3000;
app.listen(PORT, function(){
  console.log('Running on port: ' + PORT);
});

