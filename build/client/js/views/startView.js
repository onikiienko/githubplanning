require(['text!/js/templates/roomCounter.html', 'underscore'], function(startTemplate, _) {	
	var StartView = Backbone.View.extend({
		el: '.startView',
		events: {
			"click .startBtn" : "startGame"
		},
		initialize: function(){
			this.render();
			window.socket = io();
			socket.on('numberOfRooms', function(numberOfRooms){
				var template = _.template(startTemplate);
				$('.roomsNumberView').html(template({numberOfRoom: numberOfRooms}));
			});
		},
		render: function(){
			// console.log(_);
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
	window.startView = new StartView();
});


