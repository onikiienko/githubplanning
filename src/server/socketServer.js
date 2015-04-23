var _ = require('underscore');
var bb = require('backbone');
var rc = require('./roomCounter');
var currencies = require('./currencies');
var room = require('./room');


var serverLists = function(){
	var playersList = {};
	var dateFirstRoom = new Date();
	return {
		setRoom : function(){
			var roomList = [];
		},
		timeDiff : function(){			
			var dateSecondRoom = new Date();
			var date1 = new Date(dateFirstRoom);
			var date2 = new Date(dateSecondRoom);
			var timeDiff = Math.abs(date2.getTime() - date1.getTime());
		}
	};
};

exports.create = function(http){
	//create new srver connection
	var io = require('socket.io')(http);
	//list of active rooms
	var roomList = {};
	// create first stream for unset user
	io.on('connection', function(socket){
		// send number of rooms to show on start page
		socket.emit('sendCurrentDataAbout', {numberOfRooms: 100, mumberOfPlayears: 100});
		// room - room name, typeOfCards, login - name of a player
		socket.on('enter room', function(game, player){
			var roomName = '/' + game.name;
			// if there is no rooms with this name -> we create new one
			if(!socket.server.nsps['/' + game.name]){
				roomList[roomName] = {activePlayers : [], issues: game.issues, collaborators: game.collaborators, typeOfConnection: player.playerAPI.provider};
				roomList[roomName].activePlayers.push({name: player.player.name, login: player.player.login});
				var roomSocket = io.of(roomName);
				console.log(roomList);
			}else{
				var activePlayers = roomList[roomName].activePlayers;
				if (!activePlayers.indexOf({name: player.player.name, login: player.player.login})){
					roomList[roomName].activePlayers.push({name: player.player.name, login: player.player.login});
				}
				console.log(roomList);
			}
		});
	});
};
