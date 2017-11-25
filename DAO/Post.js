function PostDAO(conn){
	this._conn = conn;
}
PostDAO.prototype.ListAll = function(callback){
	this._conn.query('SELECT * FROM post',callback);
}
PostDAO.prototype.Create = function(array,callback){
	var sql = "INSERT INTO post (post_title, post_content) VALUES ?";
	var values = [[
	  array.post_title,
	  array.post_content
	  ]];
	this._conn.query(sql,[values],callback);
}
PostDAO.prototype.Read = function(id,callback){
	this._conn.query('SELECT * FROM post WHERE post_id = ?', id, callback);
}
PostDAO.prototype.Update = function(array,callback){	
	this._conn.query('UPDATE post SET ? WHERE post_id = ? ', [{
	  	post_title: array.post_title,
	  	post_content: array.post_content
	  },array.post_id], callback);	
}
PostDAO.prototype.Delete = function(id,callback){
	this._conn.query('DELETE FROM post WHERE post_id = "'+ id +'"', callback);
}
module.exports = function(){
	return PostDAO;
}