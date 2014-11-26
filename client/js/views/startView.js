var StartView = Backbone.View.extend({
	el: 'body',
	events: {
		"click .start" : "startGame"

	},
	initialize: function(){
		socket.on('numberOfRooms', function(numberOfRooms){
			$('.roomsNumberView').html('It has been created ' + numberOfRooms + ' rooms.');
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
	'<nav class="navbar navbar-inverse navbar-fixed-top headerDiv" role="navigation">'+
      '<div class="container">'+
        '<div class="navbar-header">'+
          '<a class="navbar-brand" href="#">Scrum Poker</a>'+
        '</div>'+
      '</div>'+
    '</nav>'+
    '<div class="contentDiv text-center">'+
	    '<div class="jumbotron vcenter">'+
	      '<div class="container">'+
			'<h1 class="cover-heading">Join Us!</h1>'+
			'<p class="lead roomsNumberView"></p>'+
			'<p class="lead">A realtime Planning Poker application for distributed Agile teams</p>'+
			'<p class="lead">'+
				'<a href="#" class="btn btn-lg btn-success start submit">Start</a>'+
			'</p>'+
	      '</div>'+
	    '</div>'+
    '</div>'+
      '<div class="footerDiv footer">'+
        '<p>@onikiienko</p>'+
      '</div>'+
    '</div>'
	    );
	}
});

startView = new StartView();