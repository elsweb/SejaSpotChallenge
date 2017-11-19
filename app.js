var express = require('express');
var load = require('express-load');
var mysql = require('mysql');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session')

//var index = require('./routes/index');
//var users = require('./routes/users');

var app = express();
var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })

var table    = 'post';
var database = 'challenge_sejaspot';
var conn = mysql.createConnection({
	host     : 'localhost',
	user     : 'elscode',
	password : '',
	database : database
});

//Config
load('controllers').then('models').then('routes').into(app);

app.listen(3030, () => console.log('Server Listening on port 3030!'));
app.get('/', function(req, res) {res.render('index', {title : 'SejaSpotChallenge Project'});});

//CRUD
conn.connect();
//READ list Post
app.get('/post',function(req, res){
	conn.query('SELECT * FROM ' + table, function (error, results, fields) {
		if (error) throw error;
		res.render('list_post',{
			posts: results,
			title: 'Listar Posts'
		});
	});
});
//READ single post
app.get('/post/view/:id',function(req, res){
	conn.query('SELECT * FROM ' + table + ' WHERE post_id = "'+req.params.id+'"', function (error, results, fields) {
		if (error) throw error;
		res.render('single_post',{
			post: results,
			title: results.post_title
		});
	});
});
// CREATE new post
app.get('/post/add',function(req,res){
	res.render('form_post',{title: 'Cadastrar post'});
});
app.post('/post/add',urlencodedParser,function(req,res){
	var post_title = req.body.post_title;	
	conn.query('INSERT INTO '+ table +' '+
		' SET post_title =  ? '
		, post_title
		);
	res.redirect('/post');	
});
// DELETE post
app.get('/post/remove/:id',function(req,res){
	conn.query('DELETE FROM '+ table +' WHERE post_id = "'+req.params.id+'"');
	res.redirect('/post');	
})

conn.end();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(session({secret: 'sejaspotchallengeproject19112017'}))
app.use(express.static(path.join(__dirname, 'public')));

//app.use('/', index);
//app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
})

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;