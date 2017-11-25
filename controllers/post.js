module.exports = function(app){		
	var PostControll = {
		index: function(req,res){
			res.render('post/index', {title : 'Postagem'});
		},
		view: function(req,res){
			var id = req.params.id;
			var array = req.body;
			var conn  = require('../config/mysql')();
			var PostModel  = require('../DAO/Post')();
			var AuthorModel  = require('../DAO/Author')();
			var Author = new AuthorModel(conn);
			var Post = new PostModel(conn);
			Post.Read(id,function(error,results){
				if (error) {
					console.log(error);
				}else{
					Author.ListAll(function(error, result){
						if (error) {
							console.log(error);
						}else{
							res.render('post/view', {post: results, author: result, title : results[0].post_title});
							conn.end();
						}
					});	
				}
			})			
		},	
		read: function(req,res){
			var conn  = require('../config/mysql')();
			var PostModel  = require('../DAO/Post')();
			var moment = require('moment');
			var Post = new PostModel(conn);			
			Post.ListAll(function(error, results){
				if (error) {
					console.log(error);
				}else{
					res.format({
						html:function(){
							res.render('post/consulta',{posts: results,title: 'Consultar Postagem',moment:moment});
						},
						json:function(){
							res.json(results);
						}
					});					
					conn.end();
				}							
			});			
		},
		form: function(req,res){
			var conn  = require('../config/mysql')();
			var AuthorModel  = require('../DAO/Author')();
			var Author = new AuthorModel(conn);
			Author.ListAll(function(error, results){
				if (error) {
					console.log(error);
				}else{
					res.render('post/form', {form:'create',post:[[]], author: results, title : 'Cadastrar Postagem'});
					conn.end();
				}
			});			
			
		},
		create: function(req,res){
			var array = req.body;
			var conn  = require('../config/mysql')();
			var PostModel  = require('../DAO/Post')();
			var Post = new PostModel(conn);			
			
			var validatorTitle = req.assert('post_title','Título é Obrigatório').notEmpty();
			var error = req.validationErrors();
			if(error){
				res.format({
					html: function(){
						res.status(400).render('post/form',{form:'create' , erroValidator: error, post: [array], title : 'Cadastrar Postagem'});
					},
					json: function(){
						res.status(400).json(error);
					}
				});
				return;
			}else{
				Post.Create(array, function(error, results){
					if (error) {
						console.log(error);
					}else{
						res.redirect('/post/consulta');
					}
				});	
			conn.end();
			}						
		},
		update: function(req,res){
			var array = req.body;
			var conn  = require('../config/mysql')();
			var PostModel  = require('../DAO/Post')();
			var Post = new PostModel(conn);
			Post.Update(array ,function(error,results){
				if(error){
					console.log(error);
				}else{
					res.redirect('/post/consulta');
					conn.end();
				}
			});
		},
		view_form: function(req,res){
			var id = req.params.id;
			var array = req.body;
			var conn  = require('../config/mysql')();
			var PostModel  = require('../DAO/Post')();
			var AuthorModel  = require('../DAO/Author')();
			var Author = new AuthorModel(conn);
			var Post = new PostModel(conn);
			Post.Read(id,function(error,results){
				if (error) {
					console.log(error);
				}else{
					Author.ListAll(function(error, result){
						if (error) {
							console.log(error);
						}else{
							res.render('post/form', {post: results, author: result, form:'update', title : 'Atualizar Postagem'});
							conn.end();
						}
					});	
				}
			})			
		},
		delete:function(req,res){
			var id = req.params.id;
			var conn  = require('../config/mysql')();
			var PostModel  = require('../DAO/Post')();
			var Post = new PostModel(conn);			
			Post.Delete(id,function(error, results){
				if (error) {
					console.log(error);
				}else{
					res.redirect('/post/consulta');
					conn.end();
				}
			});						
		}				
	}
	return PostControll;
}