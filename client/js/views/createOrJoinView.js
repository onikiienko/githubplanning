var CreateOrJoinView = Backbone.View.extend({
	el: '.contentDiv',
	events: {
		"click .enterRoomBtn" : "enterRoom"
	},
	isNewer: true,
	render: function(){
		this.$el.html(    
			'<div class="jumbotron vcenter" role="form">' + 
				'<div class="container">'+
				    '<h1>Enter to room</h1>'+
		            '<p>Create your own room or join other.</p>'+
		            '<input type="text" class="roomNameInput" placeholder="Room name" required autofocus="true">' +
					'<br>'+
					'<br>'+
					'<div class="currencyType">'+
						'<div class="radio-inline">'+
							'<label>'+
								'<input type="radio" name="inlineRadioOptions" id="inlineRadio1" value="standardCurrency" checked>'+
									'Standard'+
								'</label>'+
						'</div>'+
						'<div class="radio-inline">'+
							'<label>'+
								'<input type="radio" name="inlineRadioOptions" id="inlineRadio2" value="tShirtCurrency">'+
								'T-shirt'+
							'</label>'+
						'</div>'+
						'<div class="radio-inline">'+
							'<label>'+
								'<input type="radio" name="inlineRadioOptions" id="inlineRadio3" value="fibonacciCurrency">'+
								'Fibonacci'+
							'</label>'+
						'</div>'+
					'</div>'+
					'<br>'+
		            '<p>'+
		            	'<button class="btn btn-lg btn-success enterRoomBtn submit">Enter room</button>'+
		            '</p>'+
				'</div>'+
			'</div>'

        );
	},
	enterRoom: function(){
		tableModule.set({'room': $('.roomNameInput').val()});

		var room  = '/' + tableModule.toJSON().room;
		var currencyType = $('input:checked').prop('value');
		var login = tableModule.toJSON().login;
		
		socket.emit('enter room', room, currencyType, login);
		socket = io(room);
		this.socketInit();
		window.location.hash = room;
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
	}
});

createOrJoinView = new CreateOrJoinView();