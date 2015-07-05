var _ = require('underscore');
var currencies = require('./currencies');
var room = require('./room');

exports.create = function(http){
	var io = require('socket.io')(http);

	io.on('connection', function(socket){
		socket.on('message', function(model){
			console.log(model);
			socket.emit('message', model);
		});
		
		socket.on('enter', function(data){
			console.log(data.name);
			if(!socket.server.nsps[data.name]){
				var roomSocket = io.of(data.name);

				roomSocket.on('connection', function(socket){
					roomSocket.emit('ready', {text: 'readygdg'});

					// roomSocket.on('selectCard', function(model){
					// 	console.log(model);
					// 	roomSocket.emit('selectCard', model);
					// });

					socket.on('selectCard', function(model){
						console.log(model);
						roomSocket.emit('selectCard', model);
					});

				});
				
				// roomSocket.on('selectCard', function(model){
				// 	console.log(model);
				// 	roomSocket.emit('selectCard', model);
				// });

				// socket.on('selectCard', function(model){
				// 	console.log(model);
				// 	roomSocket.emit('selectCard', model);
				// });

			}
		});
	});
};
