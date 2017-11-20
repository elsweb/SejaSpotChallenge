module.exports = function(){
	var mysql = require('mysql');
	var database = 'challenge_sejaspot';
	var conn = mysql.createConnection({
		host     : 'localhost',
		user     : 'elscode',
		password : '',
		database : database
	});
	return conn;
}