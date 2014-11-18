var StartView = Backbone.View.extend({
	el: 'body',
	events: {
		"click .start" : "startGame"

	},
	startGame: function(){
		var login = this.getNameValueCookies('login');
		if(login){
			gamer.login = login;
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
								'<ul class="nav masthead-nav">'+
									'<li class="active"><a href="#">Home</a></li>'+
									'<li><a href="#">About</a></li>'+
									'<li><a href="#">Contact</a></li>'+
								'</ul>'+
							'</div>'+
						'</div>'+
						'<div class="inner cover">'+
							'<h1 class="cover-heading">Planning Poker</h1>'+
							'<p class="lead">A realtime Planning Poker application for distributed Agile teams</p>'+
							'<p class="lead">'+
								'<a href="#" class="btn btn-lg btn-success start">Start</a>'+
							'</p>'+
							'<div class="table"></div>'+
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

startView = new StartView;
startView.render();