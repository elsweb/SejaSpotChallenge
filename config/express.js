var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var flash = require('express-flash');
module.exports = function(){	
	var app = express();
	app.set('view engine', 'jade');
	app.set('views', './views');
	app.use(express.static('./public'));
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: false }));
	app.use(cookieParser('keyboard cat'));
	app.use(session({ cookie: { maxAge: 60000 }}));
	app.use(flash());
	return app;
}
