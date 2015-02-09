var _ = require('underscore');

exports.init = function(roomSocket, gamers, socket, roomName, currency){
	// when next gamer will connect to room. init room
	roomSocket.on('connection', function(socket){
		var gamersList = gamers.where(({'room' : roomName}));
		var table = roomSocket.table.toJSON();
		// send current list of gamers in room, table with choosen cards and currency 
		roomSocket.emit('connectionReady', currency, table, gamersList);
		
		// when someone send a message
		socket.on('chat message', function(msg, login){
			// send it to everyone
			roomSocket.emit('chat message', msg, login);
		});
		
		// when someone choose a card
		socket.on('vote', function(hand){
			// if player voted bafore and he want to change a card
			if (roomSocket.table.findWhere({'name': hand.name})){
				// we remove old card
				roomSocket.table.remove(roomSocket.table.findWhere({'name': hand.name}));
			}
			// add nwe card in table
			roomSocket.table.add(hand);
			var table = roomSocket.table.toJSON();
			// send new table to everyone
			roomSocket.emit('updateTable', table);
		});				
		
		//when someone want to restart/reset round, or remove cards from table
		socket.on('restart', function(hand){
			// clear table
			roomSocket.table.reset();
			var table = roomSocket.table.toJSON();
			// send new table to everyone
			roomSocket.emit('updateTable', table);
		});		

		//when someone want to restart/reset round, or remove cards from table
		socket.on('flipCards', function(hand){
			// say flip cards to other members
			roomSocket.emit('flipCards');
		});

		//when someone somehow disconnect from a game
		socket.on('disconnect', function() {
			// delete room after all gamers gone
			if (_.isEqual(socket.server.nsps[roomName].connected ,{})){
				// delete hardcore from rooms list
				delete socket.server.nsps[roomName];
			}
			// delete item from game if one gamer gone
	       	var gamerName = gamers.findWhere({'id': socket.id}).toJSON().name;
	       	// if there is any votes in game
			if (roomSocket.table.findWhere({'name': gamerName})){
				// remove this votes
			 	roomSocket.table.remove(roomSocket.table.findWhere({'name': gamerName}));
			}
			// remove gamer from all current gamers list
	    	gamers.remove(gamers.findWhere({'id': socket.id}));
		 	var gamersList = gamers.where(({'room' : roomName}));
		 	var table = roomSocket.table.toJSON();
		 	// send new table to everyone
			roomSocket.emit('updateTable', table, gamersList);
	    });
	});
}