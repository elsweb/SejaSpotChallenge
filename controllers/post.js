module.exports = function(app){		
	var PostControll = {
		index: function(req,res){
			res.render('post/index', {title : 'Postagem'});
		},		
		read: function(req,res){
			var conn  = require('../config/mysql')();
			var PostModel  = require('../DAO/Post')();
			var Post = new PostModel(conn);			
			Post.ListAll(function(error, results){
				if (error) {
					console.log(error);
				}else{
					res.format({
						html:function(){
							res.render('post/consulta',{posts: results,title: 'Consultar Postagem'});
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
			res.render('post/form', {form:'create',post:{}, title : 'Cadastrar Postagem'});
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
						res.status(400).render('post/form',{form:'create' , erroValidator: error, post: array, title : 'Cadastrar Postagem'});
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
			}
						
		},
		update: function(req,res){
			var id = req.params.id;
			var array = req.body;
			var conn  = require('../config/mysql')();
			var PostModel  = require('../DAO/Post')();
			var Post = new PostModel(conn);
			Post.Read(id,function(error,results){
				if (error) {
					req.flash('erro','Erro ao Listar Postagens' + error);
				}else{
					res.render('post/form', {posts: results,form:'update', title : 'Atualizar Postagem'});
					/*
					Post.Update(array, function(error, results){
						if (error) {
							console.log(error);
						}else{

						}
					});
					*/
					console.log(results);
				}

			})
			//res.render('post/cadastro', {title : 'Atualizar Postagem'});
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
				}
			});						
		}				
	}
	return PostControll;
}