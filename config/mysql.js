var mysql = require('mysql');
var database = 'challenge_sejaspot';
function conect(){	
	var conn = mysql.createConnection({
		host     : 'localhost',
		user     : 'elscode',
		password : '',
		database : database
	});
	return conn;
}
module.exports = function(){
	return conect();
}