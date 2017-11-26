module.exports = function(app){		
	var PostControll = {
		index: function(req,res){
			res.render('author/index', {title : 'Autor'});
		},
		view: function(req,res){
			var id = req.params.id;
			var conn  = require('../config/mysql')();
			var AuthorModel  = require('../DAO/Author')();
			var Author = new AuthorModel(conn);
			
			Author.Read(id,function(error,results){
				if (error) {
					console.log(error);
				}else{
					res.render('author/view', {author: results, title : results[0].author_name});
					conn.end();
				}
			})			
		},	
		read: function(req,res){
			var conn  = require('../config/mysql')();
			var AuthorModel  = require('../DAO/Author')();
			var Author = new AuthorModel(conn);			
			Author.ListAll(function(error, results){
				if (error) {
					console.log(error);
				}else{
					res.render('author/consulta',{authors: results,title: 'Consultar Autor'});				
					conn.end();
				}							
			});			
		},
		form: function(req,res){
			res.render('author/form', {form:'create',author:[[]], title : 'Cadastrar Autor'});
		},
		create: function(req,res){
			var array = req.body;
			var conn  = require('../config/mysql')();
			var AuthorModel  = require('../DAO/Author')();
			var Author = new AuthorModel(conn);			
			
			var validatorTitle = req.assert('author_name','Nome é Obrigatório').notEmpty();
			var error = req.validationErrors();
			if(error){
					res.render('author/form',{form:'create',author:[array] , erroValidator: error, title : 'Cadastrar Autor'});
				return;
			}else{
				Author.Create(array, function(error, results){
					if (error) {
						console.log(error);
					}else{
						res.redirect('/author/consulta');
					}
				});	
			conn.end();
			}						
		},
		update: function(req,res){
			var array = req.body;
			var conn  = require('../config/mysql')();
			var AuthorModel  = require('../DAO/Author')();
			var Author = new AuthorModel(conn);	
			Author.Update(array ,function(error,results){
				if(error){
					console.log(error);
				}else{
					res.redirect('/author/consulta');
					conn.end();
				}
			});
		},
		view_form: function(req,res){
			var id = req.params.id;
			var conn  = require('../config/mysql')();
			var AuthorModel  = require('../DAO/Author')();
			var Author = new AuthorModel(conn);
			Author.Read(id,function(error,results){
				if (error) {
					console.log(error);
				}else{
					res.render('author/form', {author: results, form:'update', title : 'Atualizar Postagem'});
					conn.end();
				}
			})			
		},
		delete:function(req,res){
			var id = req.params.id;
			var conn  = require('../config/mysql')();
			var AuthorModel  = require('../DAO/Author')();
			var Author = new AuthorModel(conn);		
			Author.Delete(id,function(error, results){
				if (error) {
					console.log(error);
				}else{
					res.redirect('/author/consulta');
					conn.end();
				}
			});						
		}				
	}
	return PostControll;
}