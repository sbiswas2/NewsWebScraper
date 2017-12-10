var express = require('express');
var router = express.Router();
// var path = require('path');
var request = require('request');
var cheerio = require('cheerio');
// var mongoose = require('mongoose');


// Import from models
var Comment = require('../models/Comment.js');
var Article = require('../models/Article.js');

// Render index page
router.get('/', function(req, res){
	res.redirect('/scrape');
});

// Render Articles
router.get('/articles', function(req, res){
	Article.find().sort({_id: -1})
	.populate('comments')
	
});