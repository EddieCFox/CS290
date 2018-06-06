var express = require('express');
var handlebars = require('express-handlebars').create({default:'main'});
var mysql = require('./dbcon.js'); /* This handles the mysql setup. */
var request = require('request');

/* Setup Express module */

var app = express();

/* Setup Port */

app.set('port',3000);

/* Setup Handlebars Module */

app.engine('handlebars',handlebars.engine);
app.set('view engine','handlebars');

/* Setup static files in public directory so they can be accessed without /public */

app.use(express.static('public'));


/* Root page, the initial page upon visiting the website. */

app.get('/',function(req,res,next)
{
   var context = {};
   mysql.pool.query('SELECT * FROM `workouts`', function(err,rows,fields)
  {

	   if(err)
    {
	     next(err);
	     return;
	  }

    var listOfWorkouts = []; /* Create empty object to push all the workout data into */
    for(var i in rows) /* For every row, push the relevant variables into the listOfWorkouts object */
    {
	     listOfWorkouts.push({'id':rows[i].id, 'name': rows[i].name, 'reps':rows[i].reps, 'weight':rows[i].weight, 'date':rows[i].date, 'lbs':rows[i].lbs}) /* Push the relevant data into the listOfWorkouts object */
    }
   
   context.workouts = listOfWorkouts;
   res.render('home',context); /* Render the home handlebars */

  });
});

// Page to insert data

app.get('/insert',function(req,res,next) /* We don't need to insert id because we already have it set to auto increment. eName stands for exercise Name */
{
  var context = {};
  mysql.pool.query("INSERT INTO `workouts` (`name`, `reps`, `weight`, `date`, `lbs`) VALUES (?, ?, ?, ?, ?)", [req.query.eName, req.query.reps, req.query.weight, req.query.date, req.query.lbs], function(err, result)
    /* The question marks represent the values that will be filled by the user. */
  {
    if(err)
    {
      next(err);
      return;
    } 

    context.workouts = result.insertId; /* Come back to this later, might add "Inserted ID: " + to it */
    res.send(JSON.stringify(context));  /* Turn user values into JSON string and send from client to server to insert into database. */
  });
});

/* Form to edit and update the data */

app.get('/updateWorkout',function(req,res,next)
{
    var context = {};

    /* Select rows from the data base where the ID corresponds to the entered parameter in the url. */

    mysql.pool.query('SELECT * FROM `workouts` WHERE id=?',[req.query.id], function(err, rows, fields)
  {
	 if(err)
   {
	   next(err);
	   return;
	 }

	  var listOfWorkouts = []; /* Create empty object to push all the workout data into */
    for(var i in rows) /* For every row, push the relevant variables into the listOfWorkouts object */
    {
       listOfWorkouts.push({'id':rows[i].id, 'name': rows[i].name, 'reps':rows[i].reps, 'weight':rows[i].weight, 'date':rows[i].date, 'lbs':rows[i].lbs}) /* Push the relevant data into the listOfWorkouts object */
    }

   	context.workouts = listOfWorkouts[0];
	  res.render('update',context); /* Render the update handlebars */
  });
});

/* The actual action of updating itself */

app.get('/update', function(req, res, next) 
{
    var context = {};
    mysql.pool.query("UPDATE `workouts` SET name=?, reps=?, weight=?, date=?, lbs=? WHERE id = ?", [req.query.eName, req.query.reps, req.query.weight, req.query.date, req.query.lbs, req.query.id], function(err, result) 
  {
        mysql.pool.query('SELECT * FROM `workouts`', function(err, rows, fields)
    {
            if(err)
            {
                next(err);
                return;
            } 

	     var listOfWorkouts = []; /* Create empty object to push all the workout data into */
       for(var i in rows) /* For every row, push the relevant variables into the listOfWorkouts object */
    {
       listOfWorkouts.push({'id':rows[i].id, 'name': rows[i].name, 'reps':rows[i].reps, 'weight':rows[i].weight, 'date':rows[i].date, 'lbs':rows[i].lbs}) /* Push the relevant data into the listOfWorkouts object */
    }
   	  context.workouts = listOfWorkouts;
    	res.render('home',context);   /* Render the home handlebar */

	 });   
  });
});


/* Deleting a row */

app.get('/delete', function(req, res, next) 
{
    var context = {};
    mysql.pool.query("DELETE FROM `workouts` WHERE id = ?", [req.query.id], function(err, result) /* Delete the row matching the id given from the workouts table. */
    {
        if(err)
        {
            next(err);
            return;
        }

        mysql.pool.query('SELECT * FROM `workouts`', function(err, rows, fields)
        {
            if(err)
            {
                next(err);
                return;
            } 

		context.results = JSON.stringify(rows); /* Stringify rows after deletion and render home handlebars. */
		res.render('home',context);
        });   
    });
});

// Reset table, provided to us by the instructor

app.get('/reset-table',function(req,res,next){
  var context = {};
  mysql.pool.query("DROP TABLE IF EXISTS workouts", function(err){ //replace your connection pool with the your variable containing the connection pool
    var createString = "CREATE TABLE workouts("+
    "id INT PRIMARY KEY AUTO_INCREMENT,"+
    "name VARCHAR(255) NOT NULL,"+
    "reps INT,"+
    "weight INT,"+
    "date DATE,"+
    "lbs BOOLEAN)";
    mysql.pool.query(createString, function(err){
      context.results = "Table reset";
      res.render('home',context);
    })
  });
});

/* Handlers for 404 and 500 error */

//Handle 404 error
app.use(function(req,res)
{
	res.status(404); /* Set status of response to 404. */
	res.render('404'); /* Render 404.handlebars */
});

//Handle 500 error

app.use(function(err,req,res,next)

{
	console.error(err.stack);
	res.type('plain/text'); 
	res.status(500);
	res.render('500');
});


app.listen(app.get('port'),function()
{
	console.log('Express started on http://localhost:'+app.get('port')+ '; press Ctrl-C to terminate.');
});