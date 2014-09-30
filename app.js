var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var bb = require('backbone');

app.get('/', function(req, res){
  res.sendfile('index.html');
});

var Game = bb.Model.extend();

io.on('connection', function(socket){
	console.log('connected to io: ', io.sockets.sockets.length);
	socket.on('create room', function(room){
		var newGame = io.of(room),
		game;
		newGame.on('connection', function(socket){
			console.log('connected to '+ room +': ', io.sockets.sockets.length);
			console.log('someone connected');
			socket.emit('room created');
			socket.on('poker load', function(name){
				game = new Game;
				game.set(name, 0)
				newGame.emit('poker load', game);
			})
			socket.on('disconnect', function(){console.log('disconnected!!!');})
		});
	})
})


http.listen(3000, function(){
  console.log('Planning started, listening on port:3000');
});