var express = require('express')
var jade = require('jade')
var bodyParser = require('body-parser')

var app = express()
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true})); 
app.use('/', require('./router'))

var server = app.listen(process.env.PORT || 3000, function(){
	var host = server.address().address;
	var port = server.address().port;
	
	console.log("Listening at http://%s:%s",host, port);
})