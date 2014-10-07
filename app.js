var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var bb = require('backbone');

app.get('/', function(req, res){
  res.sendfile('index.html');
});

var Game = bb.Model.extend();

io.on('connection', function(socket){
	// console.log('connected to io: ', io.sockets.sockets.length);
	socket.on('create room', function(room){
		
		var newGame = io.of(room);
		var game;
		
		newGame.on('connection', function(socket){
			
			socket.emit('room created');

			socket.on('poker load', function(login){
				if (!game){
					game = new Game;
				}
				game.set(login, 0)
				newGame.emit('poker load', game);
			})
			
			socket.on('vote', function(login, points){
				game.set(login, points)
				newGame.emit('vote', game);
			})
		});
	})
})


http.listen(3000, function(){
  console.log('Planning started, listening on port:3000');
});