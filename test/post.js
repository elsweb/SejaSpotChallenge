var app  = require('../config/express')();
var load = require('express-load');
load('controllers').then('DAO').then('routes').into(app);
var request = require('supertest')(app);

describe('#PostControll',function(){
	it('-Recover post in json',function(done){
		request.get('/post/consulta')
		.set('Accept', 'application/json')
        .expect('Content-Type', /json/)
		.expect(200,done);
	});
});