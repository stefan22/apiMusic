var express = require("express");
var http = require("http");
var path = require("path");
var fs = require('fs');
var cors = require("cors");
var bodyParser = require("body-parser");
var localStorage = require("local-storage"); //localStorage('artists')

//reload plugin
var reload = require("reload");

//express instance
var app = express();

//port
app.set('port', process.env.PORT || 3000);

//parsing json,forms
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));//nested 


//exec/log each req before static server/port
app.use(function(req, res, next) {
	console.log(`® stefano's  … ${req.method} request for '${req.url}' - ${JSON.stringify(req.body)}`);
	next();
});


//root:/
app.get('/', function(req,res) {
	res.sendFile(path.join(__dirname + '/public/index.html'));

});


//server
var server = http.createServer(app);




//static server
app.use(express.static(path.join(__dirname + '/public')));


//all_artists
app.get('/all_artists',function(req,res) {
	res.json(localStorage('artists'));
	
});






server.listen(app.get('port'), function () {
	console.log('Node express server listening on port ' + app.get('port') + '\n------------------------------------------');
});

//reload here
reload(app);


//global export app 
module.exports = app;
