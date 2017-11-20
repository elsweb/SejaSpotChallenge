module.exports = function(app){
	var post =  app.controllers.post;
	app.route('/post').get(post.index);
	app.route('/post/cadastro').get(post.create);	
	app.route('/post/consulta').get(post.read);
}