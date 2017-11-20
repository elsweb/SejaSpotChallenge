module.exports = function(app){		
	var PostControll = {
		index: function(req,res){
			res.render('post/index', {title : 'Postagem'});
		},
		create: function(req,res){
			res.render('post/cadastro', {title : 'Post | Cadastro'});
		},
		read: function(req,res){
			var conn  = require('../config/mysql')();
			var PostModel  = require('../DAO/Post')();
			var Post = new PostModel(conn);
			Post.ListAll(function(error, results){
				if (error) throw error;
				res.render('post/consulta',{posts: results,title: 'Post | Consulta'});
			})
		}		
	}
	return PostControll;
}