/* Import the modules */

var express = require('express');
var handlebars = require('express-handlebars').create({default:'main'});
var bodyParser = require('body-parser');


/* Setup Express module */

var app = express();

/* Setup Port. Need to do 4000 because final project is currently up on port 3000. */

app.set('port', 4000);

/* Setup Handlebars Module */

app.engine('handlebars', handlebars.engine);
app.set('view engine','handlebars');

/* Set up body parser to be able to parse application/x-www-form-urlencoded.
This will be parsed by Get requests, and POST requests that send stuf in the HTML string. */

app.use(bodyParser.urlencoded({ extended: false }));


/* Set up body parser to parse JSON. Used for post requests that send things in the body. */

app.use(bodyParser.json());

app.get('/', function(req, res) /* Handles get requests. */
{
	var queryParameters = [] /* Empty object to hold all the parameters from the query string. */

	for (var parameter in req.query) /* For every parameter in the query, push the name and value of the parameter into the parameters container object. */
	{
		queryParameters.push({'name':parameter, 'value':query[parameter]});
	}

	var context = {}; 
	context.getQueryData = queryParameters; /* set queryData in context to queryParameters, variable which has been filled by all the variables. */
	res.render('get', context);
});

app.post('/', function(req, res) /* Handles post requests. Post requests have things in both the query and the body, so a bit more complicated. */
{
	var queryParameters = []; /* Empty object to hold all the parameters from the query string. */

	for (var parameter in req.query) /* For every parameter in the query, push the name and value of the parameter into the parameters container object. */
	{
		queryParameters.push({'name':parameter, 'value':query[parameter]});
	}

	var bodyParameters = []; /* Empty object to hold all the parameters from the body string. */

	for (var parameter in req.body) /* Pushing parameters from the body this time. */
	{
		queryParameters.push({'name':parameter, 'value':query[parameter]});
	}

	var context = {};

	context.postQueryData = queryParameters;
	context.postBodyData = bodyParameters;

	res.render('post', context);
});

/* 404 and 500 handlers taken from the example on "Hello Handlebars" page. */

app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function()
{
	console.log('Express started on Port ' + app.get('port') + '; Press Ctrl-C to terminate.');
});