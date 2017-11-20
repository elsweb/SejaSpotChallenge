module.exports = function(app){		
	var PostControll = {
		index: function(req,res){
			res.render('post/index', {title : 'Post - SejaSpotChallenge'});
		},
		create: function(req,res){
			res.render('post/cadastro', {title : 'cadastro'});
		},
		read: function(req,res){
			var conn  = require('../config/mysql')();				
			conn.connect();
			conn.query('SELECT * FROM post', function (error, results, fields) {
				if (error) throw error;
					res.render('post/consulta',{posts: results,title: 'Post | Consulta'});
				});
			conn.end();	
		}		
	}
	return PostControll;
}