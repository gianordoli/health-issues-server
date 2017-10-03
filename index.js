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

var data = ["2004-01-01,30","2004-02-01,32","2004-03-01,38","2004-04-01,48","2004-05-01,72","2004-06-01,76","2004-07-01,79","2004-08-01,70","2004-09-01,55","2004-10-01,46","2004-11-01,39","2004-12-01,34","2005-01-01,32","2005-02-01,31","2005-03-01,34","2005-04-01,47","2005-05-01,63","2005-06-01,78","2005-07-01,92","2005-08-01,70","2005-09-01,53","2005-10-01,45","2005-11-01,40","2005-12-01,30","2006-01-01,32","2006-02-01,32","2006-03-01,33","2006-04-01,45","2006-05-01,59","2006-06-01,73","2006-07-01,76","2006-08-01,62","2006-09-01,51","2006-10-01,44","2006-11-01,39","2006-12-01,31","2007-01-01,31","2007-02-01,29","2007-03-01,32","2007-04-01,41","2007-05-01,59","2007-06-01,71","2007-07-01,69","2007-08-01,63","2007-09-01,46","2007-10-01,42","2007-11-01,36","2007-12-01,26","2008-01-01,28","2008-02-01,27","2008-03-01,29","2008-04-01,41","2008-05-01,55","2008-06-01,67","2008-07-01,71","2008-08-01,54","2008-09-01,46","2008-10-01,44","2008-11-01,37","2008-12-01,28","2009-01-01,28","2009-02-01,28","2009-03-01,35","2009-04-01,48","2009-05-01,58","2009-06-01,66","2009-07-01,68","2009-08-01,58","2009-09-01,45","2009-10-01,40","2009-11-01,40","2009-12-01,29","2010-01-01,27","2010-02-01,27","2010-03-01,30","2010-04-01,41","2010-05-01,53","2010-06-01,61","2010-07-01,56","2010-08-01,50","2010-09-01,45","2010-10-01,39","2010-11-01,34","2010-12-01,25","2011-01-01,26","2011-02-01,26","2011-03-01,29","2011-04-01,38","2011-05-01,55","2011-06-01,64","2011-07-01,61","2011-08-01,53","2011-09-01,46","2011-10-01,40","2011-11-01,38","2011-12-01,31","2012-01-01,30","2012-02-01,31","2012-03-01,36","2012-04-01,46","2012-05-01,58","2012-06-01,59","2012-07-01,57","2012-08-01,50","2012-09-01,42","2012-10-01,37","2012-11-01,32","2012-12-01,27","2013-01-01,27","2013-02-01,26","2013-03-01,33","2013-04-01,38","2013-05-01,53","2013-06-01,63","2013-07-01,65","2013-08-01,58","2013-09-01,45","2013-10-01,43","2013-11-01,39","2013-12-01,29","2014-01-01,29","2014-02-01,29","2014-03-01,31","2014-04-01,46","2014-05-01,60","2014-06-01,65","2014-07-01,65","2014-08-01,51","2014-09-01,44","2014-10-01,39","2014-11-01,35","2014-12-01,30","2015-01-01,33","2015-02-01,30","2015-03-01,32","2015-04-01,79","2015-05-01,73","2015-06-01,100","2015-07-01,95","2015-08-01,60","2015-09-01,59","2015-10-01,59","2015-11-01,44","2015-12-01,49","2016-01-01,40","2016-02-01,36","2016-03-01,43","2016-04-01,61","2016-05-01,66","2016-06-01,74","2016-07-01,70","2016-08-01,58","2016-09-01,55","2016-10-01,46","2016-11-01,41","2016-12-01,35","2017-01-01,34","2017-02-01,36","2017-03-01,40","2017-04-01,54","2017-05-01,79","2017-06-01,85","2017-07-01,76","2017-08-01,64","2017-09-01,54"];
var type = 'seasonal';

// // POST requests
// app.post('/stl', cors(corsOptions), function(request, response){
  // console.log(request.body['type']);
	// console.log(request.body['data']);
  // var type = request.body['type'];
  // var data = request.body['data'].split('|');
  // console.log('Diseases: ', request.body['diseases'], 'Country: ', request.body['geo']);

  var out = R("ex-sync.R")
    .data(data, type)
    .callSync();

	console.log(out);
  // response.json(out);
// });

var PORT = 4000;
app.listen(PORT, function(){
	console.log('Express server is running at ' + PORT);
});
