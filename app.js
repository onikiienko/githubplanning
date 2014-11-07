var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var bb = require('backbone');
var _ = require('underscore');

//plugin server
app.get('/', function(req, res){
  res.sendfile('index.html');
});
app.get('/client/js/utils/jquery.js', function(req, res){
  res.sendfile('client/js/utils/jquery.js');
});
app.get('/client/js/utils/underscore.js', function(req, res){
  res.sendfile('client/js/utils/underscore.js');
});
app.get('/client/js/utils/backbone.js', function(req, res){
  res.sendfile('client/js/utils/backbone.js');
});
app.get('/client/js/script.js', function(req, res){
  res.sendfile('client/js/script.js');
});
app.get('/client/css/styles.css', function(req, res){
  res.sendfile('client/css/styles.css');
});
app.get('/client/bootstrap/css/bootstrap.min.css', function(req, res){
  res.sendfile('client/bootstrap/css/bootstrap.min.css');
});
app.get('/client/bootstrap/css/bootstrap-theme.min.css', function(req, res){
  res.sendfile('client/bootstrap/css/bootstrap-theme.min.css');
});
app.get('/client/bootstrap/js/bootstrap.min.js', function(req, res){
  res.sendfile('client/bootstrap/js/bootstrap.min.js');
});

// create object for new gamers
var standardCurrency = [0, 0.5, 1, 2, 3, 5, 8, 13, 20, 40, 100, 'infinity', '?', 'coffee'];
var tShirtCurrency = ['0', 'XS', 'S', 'M', 'L', 'XL', '2XL', '3XL', '4XL', '5XL', 'infinity', '?', 'coffee'];
var fibonacciCurrency = [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 'infinity', '?', 'coffee'];

var Table = bb.Collection.extend();

var TableSocket = function(room){
	console.log('new room added');
	return io.of(room);
} 

// create first stream for unset user
io.on('connection', function(socket){
	socket.on('enter room', function(room, login, typeOfCards){

		if(!socket.server.nsps[room]){
			tableSocket = new TableSocket(room);
			tableSocket.table = new Table;
		}
			// tableSocket.roomNames = room;
			// tableSocket.usersNames = login;

		tableSocket.on('connection', function(socket){
			// this.usersNames += login;
			// console.log('room name: ' + this.roomNames + ' userNames: ' + this.usersNames);
			tableSocket.emit('typeCards', standardCurrency);
			socket.on('vote', function(hand){
				console.log(hand);
				// tableSocket.table.add(hand);
				// tableSocket.table.models = _.uniq(tableSocket.table.models);
				// console.log(tableSocket.table.models);
				// table.models = _.uniq(_.pluck(table.models, 'name'))
				for(var model in tableSocket.table.models){
					console.log(tableSocket.table.models[model].toJSON());
				}
			})
			//creat new gamer
			// var gamer;
			//add counter
			// counterOfSockets.push(socket);
			// save id of gamer for usability
			// var id = counterOfSockets.indexOf(socket);
			// remove gamer from room if disconnect
			// socket.on('disconnect', function() {
			// 	// delete string from list of socksets(counter)
			// 	// delete counterOfSockets[id];
			// 	// delete model from colliction
			// 	game.remove(game.findWhere({id : id}) );
			// 	// push new game without disconnected gamer
			// 	tableSocket.emit('update game', game);
			// });

			// socket.on('add gamer', function(login){
			// 	// if there is no gamer yet, create
			// 	if (!gamer){
			// 		gamer = new Gamer;
			// 	}
			// 	// set values to new gamer
			// 	gamer.set({id: id, login: login, point: 0});
			// 	// add gamer in game
			// 	game.add(gamer);
			// 	// push new game with new gamer. on client
			// 	tableSocket.emit('update game', game);
			// });
			
			// socket.on('gamer vote', function(login, point){
			// 	// set new value for gamer
			// 	gamer.set({id: id, login: login, point: point});
			// 	// push new game with new gamer. on client
			// 	tableSocket.emit('update game', game);
			// });
		});
	})
})

// swich on server
http.listen(3000, function(){
  console.log('Planning started, listening on port:3000');
});