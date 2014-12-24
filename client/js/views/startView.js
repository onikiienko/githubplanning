var StartView = Backbone.View.extend({
	el: '.startView',
	events: {
		"click .start" : "startGame"
	},
	initialize: function(){
		socket.on('numberOfRooms', function(numberOfRooms){
			$('.roomsNumberView').html('It has been created ' + numberOfRooms + ' rooms.');
		});
		this.render();
	},
	render: function(){
		$('.loginView, .createOrJoinView, .tableView, .startView').css('display', 'none');
		this.$el.css('display', 'block');
	},
	startGame: function(){
		var login = this.getNameValueCookies('login');
		if(login){
			tableModule.set({'login': login});
			createOrJoinView.render();
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