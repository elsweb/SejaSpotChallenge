function AuthorDAO(conn){
	this._conn = conn;
}
AuthorDAO.prototype.ListAll = function(callback){
	this._conn.query('SELECT * FROM author',callback);
}
AuthorDAO.prototype.Create = function(array,callback){
	var sql = "INSERT INTO author (author_name, author_desc) VALUES ?";
	var values = [[
	  array.author_name,
	  array.author_desc  
	  ]];
	this._conn.query(sql,[values],callback);
}
AuthorDAO.prototype.Read = function(id,callback){
	this._conn.query('SELECT * FROM author WHERE author_id = ?', id, callback);
}
AuthorDAO.prototype.Update = function(array,callback){	
	this._conn.query('UPDATE author SET ? WHERE author_id = ? ', [{
	  	author_name: array.author_name,
	  	author_desc: array.author_desc,
	  },array.author_id], callback);	
}
AuthorDAO.prototype.Delete = function(id,callback){
	this._conn.query('DELETE FROM author WHERE author_id = "'+ id +'"', callback);
}
module.exports = function(){
	return AuthorDAO;
}