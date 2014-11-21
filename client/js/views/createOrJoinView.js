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
            '<p class="lead">'+
            	'<button href="#" class="btn btn-lg btn-primary enterRoomBtn submit">Enter room</button>'+
            '</p>'
        );
	},
	enterRoom: function(){
		tableModule.set({'room': $('.roomNameInput').val()});
		var room  = '/' + tableModule.toJSON().room;
		socket.emit('enter room', room, 'standardCurrency');
		socket = io(room);
		this.socketInit();
	},
	socketInit: function(){
		socket.on('connectionReady', function(cards, table){
			cardsToChooseCollection.set(cards);
			tableView.render();
			tableView.renderCardsToChoose();
			if(table[0]){
				gameZoneCollection.set(table);
				tableView.renderGameZone();
			}
		});
		socket.on('updateTable', function(table){
			gameZoneCollection.set(table);
			tableView.renderGameZone();
		})
	}
});

createOrJoinView = new CreateOrJoinView();