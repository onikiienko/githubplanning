var LoginView = Backbone.View.extend({
	el: '.inner.cover',
	render: function(){
		this.$el.html(
			'<div class="form-signin login" role="form">' + 
		        '<h2 class="form-signin-heading">Please sign in</h2>' +
		        '<input type="login" class="form-control loginInput" placeholder="Login" required autofocus>' +
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