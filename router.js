var express = require('express')
var router = express.Router();
var app = require('./app')

router.get('/', function(req, res){
	app.getAllLinks(function(result){
		var list = [];
		for(url in result){
			list.push(JSON.parse(result[url]))
		}
		res.render('index', {title:'Welcome', urls:list.reverse()});
	});
})

router.post('/submit', function(req, res){
	app.saveLink(req.body.url, req.body.tags, function(err){
		res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
		res.redirect('/');
	});
})

module.exports = router;