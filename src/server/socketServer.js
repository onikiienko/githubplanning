var _ = require('underscore');
var currencies = require('./currencies');
var room = require('./room');

exports.create = function(http){
	var io = require('socket.io')(http);

	io.on('connection', function(socket){
		socket.on('enter', function(data){
			console.log(data.name);
			if(!socket.server.nsps[data.name]){
				var roomSocket = io.of(data.name);

				roomSocket.on('connection', function(socket){
					roomSocket.emit('ready');

					socket.on('me', function(model){
						console.log(model);
						roomSocket.emit('newEnter', model);
					});

					socket.on('selectCard', function(model){
						roomSocket.emit('selectCard', model);
					});

					socket.on('removeCard', function(model){
						console.log(model);
						roomSocket.emit('removeCard', model);
					});

					socket.on('message', function(model){
						roomSocket.emit('message', model);
					});
				});

			}
		});
	});
};
