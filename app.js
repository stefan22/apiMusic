/*
	added a mini-express - cors, body-parser,removed store
	plan: i need a plan, some routing
*/

var express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");

//express instance
var app = express();

//for parsing json
app.use(bodyParser.json());

//for parsing forms 
app.use(bodyParser.urlencoded({ extended: false }));


//log reqs
app.use(function(req,res,next) {

	console.log(`${req.method} request for '${req.url}' - ${JSON.stringify(req.body)}`);
	next();

});


//static server
app.use(express.static(__dirname + "/"));


//adding cross origin resource sharing
app.use(cors());


//route get data
app.get("/allartists", function(req,res) {
	//all artists

});




//listening on port 3001
app.listen(3001);


console.log("express app running on port 3001");



//global app 
module.exports = app;