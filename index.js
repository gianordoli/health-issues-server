/*---------- BASIC SETUP ----------*/
var express		= require('express'),
	bodyParser	= require('body-parser'),
  R = require("r-script"),
  cors = require('cors');

var app = express();						// our Express app

// Body Parser
app.use(bodyParser.urlencoded({ extended: false }));// parse application/x-www-form-urlencoded
app.use(bodyParser.json());							// parse application/json

// Express server
app.use(function(req, res, next) {
    // Setup a Cross Origin Resource sharing
    // See CORS at https://en.wikipedia.org/wiki/Cross-origin_resource_sharing
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    console.log('incoming request from ---> ' + ip);
    var url = req.originalUrl;
    console.log('### requesting ---> ' + url);	// Show the URL user just hit by user
    next();
});

var corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

// POST requests
app.post('/stl', cors(corsOptions), function(request, response){
  // console.log(request.body['type']);
	// console.log(request.body['data']);
  var type = request.body['type'];
  var data = request.body['data'].split('|');
  console.log('Diseases: ', request.body['diseases'], 'Country: ', request.body['geo']);

  var out = R("stl-async.R")
    .data(data, type)
    // .callSync();
		.call(function(err, out) {
	    if (err) throw err;
  		response.json(out);
	  });
});

var PORT = 4000;
app.listen(PORT, function(){
	console.log('Express server is running at ' + PORT);
});
