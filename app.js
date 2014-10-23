var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var bb = require('backbone');
var _ = require('underscore');

//plugin server
app.get('/', function(req, res){
  res.sendfile('index.html');
});
app.get('/client/js/jquery.js', function(req, res){
  res.sendfile('client/js/jquery.js');
});
app.get('/client/js/underscore.js', function(req, res){
  res.sendfile('client/js/underscore.js');
});
app.get('/client/js/backbone.js', function(req, res){
  res.sendfile('client/js/backbone.js');
});
app.get('/client/js/script.js', function(req, res){
  res.sendfile('client/js/script.js');
});
app.get('/client/css/styles.css', function(req, res){
  res.sendfile('client/css/styles.css');
});

// create object for new gamers
var Gamer = bb.Model.extend();
var standardCurrency = [0, 0.5, 1, 2, 3, 5, 8, 13, 20, 40, 100, 'infinity', '?', 'coffee'];
var tShirtCurrency = ['0', 'XS', 'S', 'M', 'L', 'XL', '2XL', '3XL', '4XL', '5XL', 'infinity', '?', 'coffee'];
var fibonacciCurrency = [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 'infinity', '?', 'coffee'];

// create first stream for unset user
io.on('connection', function(socket){
	// console.log('connected to io: ', io.sockets.sockets.length);
	socket.on('create room', function(room, typeOfCards){
		
		var newGame = io.of(room);
		//TODO find better way to count
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
				game.remove(game.findWhere({id : id}) );
				// push new game without disconnected gamer
				newGame.emit('update game', game);
			});

			socket.on('add gamer', function(login){
				// if there is no gamer yet, create
				if (!gamer){
					gamer = new Gamer;
				}
				// set values to new gamer
				gamer.set({id: id, login: login, point: 0});
				// add gamer in game
				game.add(gamer);
				// push new game with new gamer. on client
				newGame.emit('update game', game);
			});
			
			socket.on('gamer vote', function(login, point){
				// set new value for gamer
				gamer.set({id: id, login: login, point: point});
				// push new game with new gamer. on client
				newGame.emit('update game', game);
			});
			//TODO make more optimize variant of this faunction
			socket.on('choose borders', function(){
				var lowest = highest = middle = +game.models[0].attributes.point;
				var login_lowest = login_highest = login_middle = +game.models[0].attributes.point;
				var login_lowest = game.models[0].attributes.login;

				_.each(game.models, function(gamer){
					if(+gamer.attributes.point < lowest){
						lowest = +gamer.attributes.point;
						login_lowest =  gamer.attributes.login;
					}
					if(+gamer.attributes.point > highest){
						highest = +gamer.attributes.point;
						login_highest =  gamer.attributes.login;
					}
				});
				middle = Math.round((lowest + highest) / 2);

				if (lowest == highest){
					newGame.emit('borders are', {'Avarage' : middle});
				}else{
					newGame.emit('borders are', {'login_lowest': lowest, login_highest : highest, "Avarage" : middle});
				}

			});
		});
	})
})

// swich on server
http.listen(3000, function(){
  console.log('Planning started, listening on port:3000');
});