
var redis = require('redis')
var request = require('request')
var cheerio = require('cheerio')

var client = redis.createClient(50665,"54.213.93.154", {auth_pass : "ar7r9eh97saxhyj3xxt888xt6zcbpztt"})
//var client = redis.createClient();

var redisSaveLink = function(url, title, tags, callback){
	client.rpush('urls',JSON.stringify({url : url, title:title ,tags :tags}), function(err, result){
		callback(err);
	});
}

var app = {
	saveLink : function(url, tags, callback){
		request(url, function(error, response, body){
			if(response.statusCode  == 200){
				var $ = cheerio.load(body);
				var title = $('title').text();
				redisSaveLink(encodeURI(url), title, tags, callback);
			}
			else{
				callback(error);
			}
		});
	},
	
	getAllLinks : function(callback){
		client.lrange('urls', 0, -1, function(err, result){
			callback(result);
		});
	}
}

module.exports = app;