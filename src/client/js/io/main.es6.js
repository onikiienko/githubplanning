/*jshint globalstrict: true*/
define('io/main', ['socketIO'],
	function(io){
		let socket = io();

		return {
			enterRoom: function(roomName){
				roomName = '/' + roomName;
				
				socket.emit('enter', {name : roomName});
				
				socket = io(roomName);
				
				socket.on('ready', function(model){
					console.log(model);
				});
				
				socket.on('card', function(model){
					console.log(model);
				});
				
				socket.on('message', function(model){
					console.log(model);
				});

				socket.on('gameData', function(model){
					console.log(model);
				});
			},
			sentMessage: function(model){
				socket.emit('message', model);
			},
			selectCard: function(model){
				socket.emit('card', model)
			}
		}
	}
);