var LoginView = Backbone.View.extend({
	el: '.contentDiv',
	render: function(){
		this.$el.html(
			'<div class="loginDiv jumbotron vcenter" role="form">' + 
				'<div class="container">'+
			        '<h2>Please sign in</h2>' +
			        '<input type="text" class="loginInput" placeholder="Login" required autofocus="true">' +
			        '<div class="checkbox">' +
			          	'<label>' +
			            	'<input type="checkbox" value="remember-me" class="loginCheckBox"> Remember me' +
			          	'</label>' +
		          	'</div>'+
			        '<button class="btn btn-lg btn-success loginBtn">Sign in</button>' +
		        '</div>'+
	      	'</div>'
	    );
	},
	events: {
		"click .loginBtn" : "loginSubmit"
	},
	loginSubmit: function(){
		var login = $('.loginInput').val();
		tableModule.set({'login' : login});
		if ($('.loginCheckBox').prop('checked')){
			document.cookie = 'login=' + login;
		}
		if(window.location.hash.substring(2)){
			createOrJoinView.joinRoom(window.location.hash.substring(1));
		}else{
			createOrJoinView.render();
		}
	}
});

loginView = new LoginView();