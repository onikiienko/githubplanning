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
					socket.emit('me', window.playerModel.get('player'));
				});

				socket.on('oldCardsCollection', function(collection){
					if(!window.cardsCollection.toJSON().length){
						window.cardsCollection.addCard(collection);
					}
				});
				socket.on('oldContributorsCollection', function(collection){
					if(!window.contributorsCollection.toJSON().length){
						window.contributorsCollection.addMember(collection);
					}
				});
				socket.on('oldChatCollection', function(collection){
					if(!window.chatCollection.toJSON().length){
						window.chatCollection.addMessage(collection);
					}
				});

				socket.on('newEnter', function(model){
					window.contributorsCollection.addMember(model);
				});
				
				socket.on('selectCard', function(model){
					window.cardsCollection.addCard(model);
				});

				socket.on('removeCard', function(model){
					window.cardsCollection.removeCard(model);
				});
				
				socket.on('message', function(model){
					window.chatCollection.addMessage(model);
				});

				socket.on('gameData', function(model){
					console.log(model);
				});
			},
			sendMessage: function(model){
				socket.emit('message', model);
			},
			selectCard: function(model){
				socket.emit('selectCard', model);
			},
			removeCard: function(model){
				socket.emit('removeCard', model);
			}
		}
	}
);