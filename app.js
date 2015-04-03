var app = require('express')();
var express = require('express');

var http = require('http').Server(app);
var socketServer = require('./build/server/socketServer');

socketServer.create(http);

//plugin server
app.get('/', function(req, res){
	res.sendfile('./build/client/index.html');
});
app.use('/styles', express.static(__dirname + '/build/client/css'));
app.use('/js', express.static(__dirname + '/build/client/js'));
app.use('/utils', express.static(__dirname + '/build/client/utils'));
app.use('/images', express.static(__dirname + '/build/client/images'));


// swich on server
http.listen(80, function(){console.log('Ready!');});