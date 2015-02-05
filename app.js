var app = require('express')();
var express = require('express');

var http = require('http').Server(app);
var ss = require('./server/socketServer');

ss.create(http);

//plugin server
app.get('/', function(req, res){
	res.sendfile('index.html');
});
app.use('/styles', express.static(__dirname + '/client/css'));
app.use('/js', express.static(__dirname + '/client/js'));
app.use('/utils', express.static(__dirname + '/client/utils'));


// swich on server
http.listen(80, function(){
  console.log('Planning started: 127.0.0.1');
});