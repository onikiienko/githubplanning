require(['text!/js/templates/createOrJoinTemplate.html'], function(createOrJoinTemplate) {
	window.CreateOrJoinView = Backbone.View.extend({
		el: '.content',
		events: {
			"click .enterRoomBtn" : "createRoom"
		},
		isNewer: true,
		initialize: function(){
			this.render();
		},
		render: function(){
			var template = _.template(createOrJoinTemplate);
			$(this.el).html(template);
		},
		createRoom: function(){
			player.getIssues($('select option:selected').text());
			// tableModule.set({'room': $('.roomNameInput').val()});

			// var room  = '/' + tableModule.toJSON().room;
			// var currencyType = $('input:checked').prop('value');
			// var login = tableModule.toJSON().login;
			
			// socket.emit('enter room', room, currencyType, login);
			// socket = io(room);
			// this.socketInit();
			// window.location.hash = room;
		},
		joinRoom: function(room){
			tableModule.set({'room': room.substring(1)});
			var login = tableModule.toJSON().login;
			socket.emit('enter room', room, undefined, login);
			socket = io(room);
			this.socketInit();
		},
		socketInit: function(){
			var that = this;
			socket.on('connectionReady', function(cards, table, gamers){
				if (that.isNewer){
					tableView.render();
					cardsToChooseCollection.set(cards);
					tableView.renderCardsToChoose();
					if(table.length){
						gameZoneCollection.set(table);
						tableView.renderGameZone();
					}
					that.isNewer = false;
				}		
				gamersListCollection.set(gamers);
				tableView.renderGamersList();
				
			});
			socket.on('updateTable', function(table, gamers){
				gameZoneCollection.set(table);
				if (gamers){
					gamersListCollection.set(gamers);
				}
				tableView.renderGameZone();
				tableView.renderGamersList();
			});
			socket.on('chat message', function(msg, login){
				tableView.renderMessage(msg, login);
			});
			socket.on('flipCards', function(msg, login){
				$('.flipper').addClass('hover');
			});
		}
	});
});