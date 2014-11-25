var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var bb = require('backbone');
var _ = require('underscore');
var fs = require('fs');

var pkg = "./package.json";
var roomsNumber;

getNumberOfRooms = function(){
	roomsNumber = parseInt(fs.readFileSync(pkg, 'utf8').match(/"numberOfRooms": "([0-9.]+)",/).pop());
	return roomsNumber;
};

incNumberOfRooms = function(){
	if(!roomsNumber) this.getNumberOfRooms();
	console.log(roomsNumber);
	roomsNumber++;
	console.log(roomsNumber);
	var pkgContent = fs.readFileSync(pkg, 'utf8');
	fs.writeFileSync(pkg, pkgContent.replace(/"numberOfRooms": "([0-9.]+)",/, '"numberOfRooms": "' + roomsNumber + '",'), 'utf8');
};

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
app.get('/client/js/planningpoker.min.js', function(req, res){
  res.sendfile('client/js/planningpoker.min.js');
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
};
var Table = bb.Collection.extend();
var Gamers = bb.Collection.extend();
var gamers = new Gamers();


// create first stream for unset user
io.on('connection', function(socket){
	socket.emit('numberOfRooms', getNumberOfRooms());
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
			}
			var tableSocket = io.of(room);
			tableSocket.table = new Table();

			incNumberOfRooms();
			socket.emit('numberOfRooms', getNumberOfRooms());
			
			tableSocket.on('connection', function(socket){
				var gamersList = gamers.where(({'room' : room}));
				var table = tableSocket.table.toJSON();
				tableSocket.emit('connectionReady', currency, table, gamersList);
				socket.on('vote', function(hand){
					if (tableSocket.table.findWhere({'name': hand.name})){
						tableSocket.table.remove(tableSocket.table.findWhere({'name': hand.name}));
					}
					tableSocket.table.add(hand);
					var table = tableSocket.table.toJSON();
					tableSocket.emit('updateTable', table);
				});				
				socket.on('restart', function(hand){
					tableSocket.table.reset();
					var table = tableSocket.table.toJSON();
					tableSocket.emit('updateTable', table);
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
					}
					// remove gamer from all current gamers list
			    	gamers.remove(gamers.findWhere({'id': socket.id}));
				 	var gamersList = gamers.where(({'room' : room}));
				 	var table = tableSocket.table.toJSON();
					tableSocket.emit('updateTable', table, gamersList);
			    });
			});
		}
	});
});

// swich on server
http.listen(3000, function(){
  console.log('Planning started, listening on port:3000');
});