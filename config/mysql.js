var mysql = require('mysql');
function conect(){
	if(!process.env.NODE_ENV){
		var conn = mysql.createConnection({
		host     : 'localhost',
		user     : 'elscode',
		password : '',
		database : 'challengesejaspot'
		});
	return conn;
	}
	if(process.env.NODE_ENV == 'dev'){
		var conn = mysql.createConnection({
		host     : 'localhost',
		user     : 'elscode',
		password : '',
		database : 'challenge_sejaspot'
		});
	return conn;
	}
}
module.exports = function(){
	return conect();
}