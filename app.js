var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var bb = require('backbone');

//plugin server
app.get('/', function(req, res){
  res.sendfile('index.html');
});

// create object for new gamers
var Gamer = bb.Model.extend();

// create first stream for unset user
io.on('connection', function(socket){
	// console.log('connected to io: ', io.sockets.sockets.length);
	socket.on('create room', function(room){
		
		var newGame = io.of(room);
		var counterOfSockets = []; //counter for room if someone is gone
		var	game = new bb.Collection; //new game, new room
		
		newGame.on('connection', function(socket){
			//creat new gamer
			var gamer;
			//add counter
			counterOfSockets.push(socket);
			// save id of gamer for usability
			var id = counterOfSockets.indexOf(socket);
			// remove gamer from room if disconnect
			socket.on('disconnect', function() {
				// delete string from list of socksets(counter)
				delete counterOfSockets[id];
				// delete model from colliction
				delete game.remove(game.findWhere({id : id}) );
				// push new game without disconnected gamer
				newGame.emit('poker load', game);
			});
			socket.emit('room created');

			socket.on('poker load', function(login){
				// if there is no gamer yet, create
				if (!gamer){
					gamer = new Gamer;
				}
				// set values to new gamer
				gamer.set({id: id, login: login, point: 0});
				// add gamer in game
				game.add(gamer);
				// push new game with new gamer. on client
				newGame.emit('poker load', game);
			})
			
			socket.on('vote', function(login, point){
				// set new value for gamer
				gamer.set({id: id, login: login, point: point});
				// push new game with new gamer. on client
				newGame.emit('vote', game);
			})
		});
	})
})

// swich on server
http.listen(3000, function(){
  console.log('Planning started, listening on port:3000');
});