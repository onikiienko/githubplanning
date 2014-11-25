var CreateOrJoinView = Backbone.View.extend({
	el: '.inner.cover',
	events: {
		"click .enterRoomBtn" : "enterRoom"
	},
	render: function(){
		this.$el.html(    
		    '<h1 class="cover-heading">Enter to room</h1>'+
            '<p class="lead">Create your own room or join other.</p>'+
            	'<input type="default" class="form-control roomNameInput" placeholder="Room name" required autofocus>' +
            '</p>'+
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
            '<p class="lead">'+
            	'<button href="#" class="btn btn-lg btn-success enterRoomBtn submit">Enter room</button>'+
            '</p>'
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
	},
	socketInit: function(){
		socket.on('connectionReady', function(cards, table, gamers){
			
			gamersListCollection.set(gamers);
			
			cardsToChooseCollection.set(cards);
			tableView.render();
			tableView.renderCardsToChoose();
			tableView.renderGamersList();
			
			if(table[0]){
				gameZoneCollection.set(table);
				tableView.renderGameZone();
			}
		});
		socket.on('updateTable', function(table, gamers){
			gameZoneCollection.set(table);
			if (gamers){
				gamersListCollection.set(gamers);
			}
			tableView.renderGameZone();
			tableView.renderGamersList();
		});
	}
});

createOrJoinView = new CreateOrJoinView();