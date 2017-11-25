var app  = require('../config/express')();
var load = require('express-load');
load('controllers').then('DAO').then('routes').into(app);
var request = require('supertest')(app);
var DatabaseCleaner = require('database-cleaner');
var databaseCleaner = new DatabaseCleaner('mysql');


describe('#PostControll',function(){	
	beforeEach(function(done){
		var conn  = require('../config/mysql')();
		databaseCleaner.clean(conn, function(err,result){
			if(!err){
				done();
			}
		});
	});
	it('Listing of post',function(done){
		request.get('/post/consulta')
		.set('Accept', 'application/json')
        .expect('Content-Type', /json/)
		.expect(200,done);
	});
	it('Invalid registration',function(done){
		request.post('/post/create')
		.send({
			post_title : '', 
			post_content : 'Insert for API Example'
		})
		.expect(400,done);
	});
	it('Valid registration',function(done){
		request.post('/post/create')
		.send({
			post_title : 'API Example', 
			post_content : 'Insert for API Example'
		})
		.expect(302,done);
	});	
});