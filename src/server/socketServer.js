var _ = require('underscore');
var Backbone = require('backbone');
var currencies = require('./currencies');

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
	addContributor: function(model){
		if(!this.findWhere({login: model.login})){
			this.add(model);
		}
	},
	removeContributor: function(model){
		this.remove(model);
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
				var cards = currencies.setCurrency(data.currency);

				cardsCollection.on('add', function(model, collection, options){
  					roomSocket.emit('selectCard', model);
				});
				cardsCollection.on('remove', function(model, collection, options){
  					roomSocket.emit('removeCard', model);
				});
				contributorsCollection.on('add', function(model, collection, options){
  					roomSocket.emit('addContributor', model, model.cid);
				});
				contributorsCollection.on('remove', function(model, collection, options){
  					roomSocket.emit('removeContributor', model);
				});
				chatCollection.on('add', function(model, collection, options){
  					roomSocket.emit('message', model);
				});

				roomSocket.on('connection', function(socket){
					roomSocket.emit('ready', cards);

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
						model.socketId = socket.id;
						contributorsCollection.addContributor(model);
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

					socket.on('leave', function(socketId){
						var contributor = contributorsCollection.findWhere({socketId: socketId});
						
						var card = {contributor: { avatar: contributor.get('avatar'), name: contributor.get('name')}}
						
						cardsCollection.removeCard(card);
						
						contributorsCollection.removeContributor(contributor);
					});

					socket.on('disconnect', function(){
						var contributor = contributorsCollection.findWhere({socketId: socket.id});
						
						contributorsCollection.removeContributor(contributor);

						var card = {contributor: { avatar: contributor.get('avatar'), name: contributor.get('name')}}

						cardsCollection.removeCard(card);
					});
				});

			}
		});
	});
};