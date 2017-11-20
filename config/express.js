var express = require('express');
module.exports = function(){	
	var app = express();
	app.set('view engine', 'jade');
	app.set('views', './views');
	app.use(express.static('./public'));	
	return app;
}
