module.exports = function(app){
	var post =  app.controllers.post;
	app.route('/post').get(post.index);
	app.route('/post/consulta').get(post.read);
	app.route('/post/cadastro').get(post.create);
	app.route('/post/cadastro').post(post.post);
	app.route('/post/remove/:id').get(post.delete);
}