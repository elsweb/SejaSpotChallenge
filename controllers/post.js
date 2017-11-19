module.exports = function(app){
	var PostControll = {
		index: function(req,res){
			res.render('post/index', {title : 'Post - SejaSpotChallenge'});
		},
		create: function(req,res){
			res.render('post/cadastro', {title : 'cadastro'});
		},
		read: function(req,res){
			res.render('post/consulta', {title : 'consulta'});
		}		
	}
	return PostControll;
}