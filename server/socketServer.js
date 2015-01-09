var _ = require('underscore');
var bb = require('backbone');
var rc = require('./roomCounter');
var currencies = require('./currencies');
var room = require('./room');

exports.create = function(http){	
	var io = require('socket.io')(http);
	var Table = bb.Collection.extend();
	var Gamers = bb.Collection.extend()
	var gamers = new Gamers;

	// create first stream for unset user
	io.on('connection', function(socket){
		// send number of rooms to show on start page
		socket.emit('numberOfRooms', rc.getNumberOfRooms());
		// room - room name, typeOfCards, login - name of a player
		socket.on('enter room', function(roomName, typeOfCards, login){
			// create new player and put him in ALL gamers collection from ALL rooms
			gamers.add(new bb.Model({name: login, id : socket.id, room : roomName}));
			// if there is no rooms with this name -> we create new one
			if(!socket.server.nsps[roomName]){
				// define wich 'currency' creator whant
				var currency = currencies.setCurrency(typeOfCards);
				// create new socket for new room
				var roomSocket = io.of(roomName);
				// create new table for this room
				roomSocket.table = new Table();
				// add one to room counter
				rc.incNumberOfRooms();
				room.init(roomSocket, gamers, socket, roomName, currency);
			}
		});
	});
};
