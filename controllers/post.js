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
					//Count Post Views
					var count = results[0].post_view == 'NULL' ? 1 : results[0].post_view + 1 ;
					Post.UpdateView(id,count,function(error,results){});
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
							conn.end();
						},
						json:function(){
							res.json(results);
							conn.end();
						}
					});	
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
			var validatorTitle = req.assert('post_title','Título é Obrigatório').notEmpty();
			var error_v = req.validationErrors();			
			res.format({
				html: function(){
					if(error_v){
						var AuthorModel  = require('../DAO/Author')();
						var Author = new AuthorModel(conn);
						Author.ListAll(function(error_a, results_a){
							if (error_a) {
								console.log(error_a);
							}else{
								res.status(400).render('post/form', {form:'create', erroValidator: error_v, post:[array], author: results_a, title : 'Cadastrar Postagem'});
								return;
								conn.end();
							}
						});
					return;
					}else{
						var PostModel  = require('../DAO/Post')();
						var Post = new PostModel(conn);
						Post.Create(array, function(error, results){
							if (error) {
								console.log(error);
							}else{
								conn.end();
								res.redirect('/post/consulta');	
							}
						});
					}
				},
				json: function(){
					var PostModel  = require('../DAO/Post')();
					var Post = new PostModel(conn);
					Post.Create(array, function(error, results){
						if (error) {
							res.status(400).json(error);
						}else{
							res.status(200).json('Cadastrado com Sucesso');
							conn.end();
						}
					});
				}
			});									
		},
		update: function(req,res){
			var array = req.body;
			var validatorTitle = req.assert('post_title','Título é Obrigatório').notEmpty();
			var error_v = req.validationErrors();
			if(error_v){
				var conn  = require('../config/mysql')();
				var PostModel  = require('../DAO/Post')();
				var Post = new PostModel(conn);
				var AuthorModel  = require('../DAO/Author')();
				var Author = new AuthorModel(conn);
				Author.ListAll(function(error_a, result_a){
					if (error_a) {
						console.log(error_a);
					}else{
						console.log(error_v);
						res.render('post/form', {post: [array], author: result_a, erroValidator: error_v, form:'update', title : 'Atualizar Postagem'});
						conn.end();								
					}
				});
			}else{
				var conn  = require('../config/mysql')();
				var PostModel  = require('../DAO/Post')();
				var Post = new PostModel(conn);
				Post.Update(array ,function(error,results){
					if(error){
						console.log(error);
					}else{
						conn.end();
						res.redirect('/post/consulta');						
					}
				});
			}
		},
		view_form: function(req,res){
			var id = req.params.id;
			var conn  = require('../config/mysql')();
			var PostModel  = require('../DAO/Post')();
			var Post = new PostModel(conn);
			var AuthorModel  = require('../DAO/Author')();
			var Author = new AuthorModel(conn);

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
					conn.end();
					res.redirect('/post/consulta');					
				}
			});						
		}				
	}
	return PostControll;
}