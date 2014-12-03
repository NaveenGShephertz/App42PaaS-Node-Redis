
var redis = require('redis')
var request = require('request')
var cheerio = require('cheerio')

var client = redis.createClient(13856,"54.213.93.154", {auth_pass : "an8dmczjnkxsppv4j0ff30cuzx6u48bm"})
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