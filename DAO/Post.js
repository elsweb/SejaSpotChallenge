function PostDAO(conn){
	this._table = 'post';
	this._conn = conn;
}
PostDAO.prototype.ListAll = function(callback){
	sql = 'SELECT p.post_id as post_id, p.post_title as post_title,p.post_content as post_content,p.post_date as post_date,p.post_view as post_view, a.author_name as author FROM '+this._table+' as p, author as a WHERE p.author_id = a.author_id';
	this._conn.query(sql,callback);
}
PostDAO.prototype.Create = function(array,callback){
	var sql = 'INSERT INTO '+ this._table +' (author_id, post_title, post_content) VALUES ?';
	var values = [[
	  array.author_id,
	  array.post_title,
	  array.post_content  
	  ]];
	this._conn.query(sql,[values],callback);
}
PostDAO.prototype.Read = function(id,callback){
	this._conn.query('SELECT * FROM '+ this._table +' WHERE post_id = ?', id, callback);
}
PostDAO.prototype.Update = function(array,callback){	
	this._conn.query('UPDATE '+ this._table +' SET ? WHERE post_id = ? ', [{
	  	author_id: array.author_id,
	  	post_title: array.post_title,
	  	post_content: array.post_content
	  },array.post_id], callback);	
}
PostDAO.prototype.UpdateView = function(id,val,callback){
	this._conn.query('UPDATE '+ this._table +' SET ? WHERE post_id = ? ', [{
	  	post_view: val	  	
	  },id], callback);
}
PostDAO.prototype.Delete = function(id,callback){
	this._conn.query('DELETE FROM '+ this._table +' WHERE post_id = '+ id , callback);
}
module.exports = function(){
	return PostDAO;
}