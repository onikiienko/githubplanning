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
app.get('/client/js/utils/require.js', function(req, res){
  res.sendfile('client/js/utils/require.js');
});
app.get('/client/js/script.js', function(req, res){
  res.sendfile('client/js/script.js');
});
app.get('/client/js/views/startView.js', function(req, res){
  res.sendfile('client/js/views/startView.js');
});
app.get('/client/js/views/createOrJoinView.js', function(req, res){
  res.sendfile('client/js/views/createOrJoinView.js');
});
app.get('/client/js/views/loginView.js', function(req, res){
  res.sendfile('client/js/views/loginView.js');
});
app.get('/client/js/views/tableView.js', function(req, res){
  res.sendfile('client/js/views/tableView.js');
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

var standardCurrency = [{'0': 0}, {'0.5' : 1}, {'1' : 2}, {'2' : 3}, {'3' : 4}, {'5' : 5}, {'8' : 6}, {'13' : 7}, {'20' : 8}, {'40' : 9}, {'100' : 10}, {'infinity' : 11}, {'?' : 12}, {'coffee' : 13}];
var tShirtCurrency = [{'XS': 0}, {'S' : 1}, {'M' : 2}, {'L' : 3}, {'XL' : 4}, {'2XL' : 5}, {'3XL' : 6}, {'4XL' : 7}, {'5XL' : 8}, {'infinity' : 11}, {'?' : 12}, {'coffee' : 13}];
var fibonacciCurrency = [{'0': 0}, {'1' : 1}, {'2' : 2}, {'3' : 3}, {'5' : 4}, {'8' : 5}, {'13' : 6}, {'21' : 7}, {'34' : 8}, {'infinity' : 11}, {'?' : 12}, {'coffee' : 13}];

var TableSocket = function(room){
	return io.of(room);
} 
var Table = bb.Collection.extend();
var Gamers = bb.Collection.extend();
var RoomsCounter = bb.Collection.extend();
var gamers = new Gamers;
var roomsCounter = new RoomsCounter;

roomsCounter.howMatch = function(){
	console.log('Rooms has been created: ' + roomsCounter.toJSON().length);
}
setInterval(roomsCounter.howMatch, 5000);

// create first stream for unset user
io.on('connection', function(socket){
	socket.on('enter room', function(room, typeOfCards, login){
		gamers.add(new bb.Model({name: login, id : socket.id, room : room}));
		if(!socket.server.nsps[room]){
			var currency;
			switch(typeOfCards){
				    case 'standardCurrency':
				    	currency = standardCurrency;
				        break;
				    case 'tShirtCurrency':
				    	currency = tShirtCurrency;
				        break;					    
				    case 'fibonacciCurrency':
				    	currency = fibonacciCurrency;
				        break;
			};
			var tableSocket = io.of(room);
			tableSocket.table = new Table;
			roomsCounter.add(new bb.Model({room : room}));
			tableSocket.on('connection', function(socket){
				tableSocket.emit('connectionReady', currency, tableSocket.table.toJSON());
				socket.on('vote', function(hand){
					if (tableSocket.table.findWhere({'name': hand.name})){
						tableSocket.table.remove(tableSocket.table.findWhere({'name': hand.name}));
					}
					tableSocket.table.add(hand);
					tableSocket.emit('updateTable', tableSocket.table.toJSON());
				});				
				socket.on('restart', function(hand){
					tableSocket.table.reset();
					tableSocket.emit('updateTable', tableSocket.table.toJSON());
				});
				socket.on('disconnect', function() {
					// delete room after all gamers gone
					if (_.isEqual(socket.server.nsps[room].connected ,{})){
						// delete hardcore from rooms list
						delete socket.server.nsps[room];
					}
					// delete item from game if one gamer gone
			       	var gamerName = gamers.findWhere({'id': socket.id}).toJSON().name;
			       	// if there is any votes in game
					if (tableSocket.table.findWhere({'name': gamerName})){
						// remove this votes
					 	tableSocket.table.remove(tableSocket.table.findWhere({'name': gamerName}));
					 	// update client side
						tableSocket.emit('updateTable', tableSocket.table.toJSON());
					}
					// remove gamer from all current gamers list
			    	gamers.remove(gamers.findWhere({'id': socket.id}));
			    });
			});
		}
	});
});

// swich on server
http.listen(3000, function(){
  console.log('Planning started, listening on port:3000');
});