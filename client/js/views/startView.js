var StartView = Backbone.View.extend({
	el: 'body',
	events: {
		"click .start" : "startGame"

	},
	initialize: function(){
		socket.on('numberOfRooms', function(numberOfRooms){
			$('.roomsNumberView').html('It has been created ' + numberOfRooms + ' number of rooms. Join us!');
		});
		this.render();
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
	},
	render: function(){
		this.$el.append(
			'<div class="site-wrapper">'+
				'<div class="site-wrapper-inner">'+
					'<div class="cover-container">'+
						'<div class="masthead clearfix">'+
							'<div class="inner">'+
								'<h3 class="masthead-brand">Planning Poker</h3>'+
							'</div>'+
						'</div>'+
						'<div class="inner cover">'+
							'<h1 class="cover-heading">Planning Poker</h1>'+
							'<p class="lead roomsNumberView"></p>'+
							'<p class="lead">A realtime Planning Poker application for distributed Agile teams</p>'+
							'<p class="lead">'+
								'<a href="#" class="btn btn-lg btn-success start submit">Start</a>'+
							'</p>'+
						'</div>'+
						'<div class="mastfoot">'+
							'<div class="inner">'+
								'<p>Created by <a href="https://twitter.com/onikiienko">@onikiienko</a></p>'+
							'</div>'+
						'</div>'+
					'</div>'+
				'</div>'+
			'</div>'
	    );
	}
});

startView = new StartView();