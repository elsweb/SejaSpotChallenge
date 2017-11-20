function PostDAO(conn){
	this._conn = conn;
}
PostDAO.prototype.ListAll = function(callback){
	this._conn.query('SELECT * FROM post',callback);
}
module.exports = function(){
	return PostDAO;
}