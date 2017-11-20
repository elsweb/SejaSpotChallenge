var app  = require('./config/express')();
var load = require('express-load');

//Config
load('controllers').then('models').then('routes').into(app);
app.listen(3030, function(){console.log('Server listening on port 3030!')});
module.exports = app;