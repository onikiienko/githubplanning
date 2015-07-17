/*jshint globalstrict: true*/
define('io/main', [
	'socketIO',
	'data/service'
],
	function(io, appData){
		let socket = io();

		return {
			enterRoom: function(roomName){
				roomName = '/' + roomName;
				
				socket.emit('enter', {name : roomName});
				
				socket = io(roomName);
				
				socket.on('ready', function(model){
					socket.emit('me', appData.headerModel);
				});

				socket.on('oldCardsCollection', function(collection){
					if(!appData.cardsCollection.toJSON().length){
						appData.cardsCollection.addCard(collection);
					}
				});
				socket.on('oldContributorsCollection', function(collection){
					if(!appData.contributorsCollection.toJSON().length){
						appData.contributorsCollection.addContributor(collection);
					}
				});
				socket.on('oldChatCollection', function(collection){
					if(!appData.chatCollection.toJSON().length){
						appData.chatCollection.addMessage(collection);
					}
				});

				socket.on('addContributor', function(model){
					appData.contributorsCollection.addContributor(model);
				});

				socket.on('removeContributor', function(model){
					appData.contributorsCollection.removeContributor(model);
				});
				
				socket.on('selectCard', function(model){
					appData.cardsCollection.addCard(model);
				});

				socket.on('removeCard', function(model){
					appData.cardsCollection.removeCard(model);
				});
				
				socket.on('message', function(model){
					appData.chatCollection.addMessage(model);
				});
				
				socket.on('allRooms', function(model){
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