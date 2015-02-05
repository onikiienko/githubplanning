var StartView = Backbone.View.extend({
	el: '.startView',
	events: {
		"click .startBtn" : "startGame"
	},
	initialize: function(){
		socket.on('numberOfRooms', function(numberOfRooms){
			$('.roomsNumberView').html('It has been created ' + numberOfRooms + ' rooms.');
		});
		this.render();
	},
	render: function(){
		$('.loginView, .createOrJoinView, .tableView, .startView').css('display', 'none');
		this.$el.css('display', 'table');
	},
	startGame: function(){
		var login = this.getNameValueCookies('login');
		if(login){
			tableModule.set({'login': login});
			if(window.location.hash.substring(2)){
				createOrJoinView.joinRoom(window.location.hash.substring(1));
				// tableView.render();
			}else{
				createOrJoinView.render();
			}
		}else{
			loginView.render();
		}			
	},
	getNameValueCookies: function(name) {
  		var value = "; " + document.cookie;
  		var parts = value.split("; " + name + "=");
  		if (parts.length == 2) return parts.pop().split(";").shift();
	}
});

startView = new StartView();