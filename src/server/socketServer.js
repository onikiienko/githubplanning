var _ = require('underscore');
var Backbone = require('backbone');
var currencies = require('./currencies');
var room = require('./room');




var Cards = Backbone.Collection.extend({
	addCard: function(model){
		if(this.filter(function (nextCard) { return _.isEqual(nextCard.get("contributor"), model.contributor);})){
			this.remove(this.filter(function (nextCard) { return _.isEqual(nextCard.get("contributor"), model.contributor);}));
			this.add(model);
		}else{
			this.add(model);
		}
	},
	removeCard: function(model){
		this.remove(this.filter(function (nextCard) { return _.isEqual(nextCard.get("contributor"), model.contributor);}));
	}
});

var Contributors = Backbone.Collection.extend({
	addMember: function(model){
		if(!this.findWhere(model)){
			this.add(model);
		}
	}
});

var Chat = Backbone.Collection.extend({
	addMessage: function(model){
		this.add(model);
	}
});


exports.create = function(http){
	var io = require('socket.io')(http);

	io.on('connection', function(socket){
		socket.on('enter', function(data){
			if(!socket.server.nsps[data.name]){
				var roomSocket = io.of(data.name);
				var cardsCollection = new Cards();
				var contributorsCollection = new Contributors();
				var chatCollection = new Chat();

				cardsCollection.on('add', function(model, collection, options){
  					roomSocket.emit('selectCard', model);
				});
				cardsCollection.on('remove', function(model, collection, options){
  					roomSocket.emit('removeCard', model);
				});
				contributorsCollection.on('add', function(model, collection, options){
  					roomSocket.emit('newEnter', model);
				});
				chatCollection.on('add', function(model, collection, options){
  					roomSocket.emit('message', model);
				});

				roomSocket.on('connection', function(socket){
					roomSocket.emit('ready');

					if(cardsCollection.toJSON().length){
						roomSocket.emit('oldCardsCollection', cardsCollection);
					}
					if(contributorsCollection.toJSON().length){
						roomSocket.emit('oldContributorsCollection', contributorsCollection);
					}
					if(chatCollection.toJSON().length){
						roomSocket.emit('oldChatCollection', chatCollection);
					}

					socket.on('me', function(model){
						contributorsCollection.addMember(model);
					});

					socket.on('selectCard', function(model){
						cardsCollection.addCard(model);
					});

					socket.on('removeCard', function(model){
						cardsCollection.removeCard(model);
					});

					socket.on('message', function(model){
						chatCollection.addMessage(model);
					});
				});

			}
		});
	});
};