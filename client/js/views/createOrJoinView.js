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
            	'<button href="#" class="btn btn-lg btn-primary enterRoomBtn">Enter room</button>'+
            '</p>'
        );
	},
	enterRoom: function(){
		gamer.room = $('.roomNameInput').val();
		var room  = '/' + gamer.room;
		socket.emit('enter room', room, 'standardCurrency');
		socket = io(room);
		this.socketInit();
		tableView.render();
	},
	socketInit: function(){
		socket.on('connectionReady', function(cards, table){
			gamer.cards = cards;
			if(table[0]){
				gamer.table.set(table);
				console.log('table: ');
				console.log(gamer.table.models);
			}
		});
		socket.on('updateTable', function(table){
			gamer.table.set(table);
			console.log('table: ');
			console.log(gamer.table.models);
		})
	}
});

createOrJoinView = new CreateOrJoinView;