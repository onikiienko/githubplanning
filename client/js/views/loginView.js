var LoginView = Backbone.View.extend({
	el: '.contentDiv',
	render: function(){
		this.$el.html(
			'<div class="loginDiv" role="form">' + 
		        '<h2>Please sign in</h2>' +
		        '<input type="text" class="loginInput" placeholder="Login" required autofocus>' +
		        '<div class="checkbox">' +
		          	'<label>' +
		            	'<input type="checkbox" value="remember-me" class="loginCheckBox"> Remember me' +
		          	'</label>' +
	          	'</div>'+
		        '<button class="btn btn-lg btn-success loginBtn" type="submit">Sign in</button>' +
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
		createOrJoinView.render();
	}
});

loginView = new LoginView();