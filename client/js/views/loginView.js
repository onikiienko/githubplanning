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
		        '<button class="btn btn-lg btn-primary loginBtn" type="submit">Sign in</button>' +
	      	'</div>'
	    );
	},
	events: {
		"click .loginBtn" : "loginSubmit"
	},
	loginSubmit: function(){
		gamer.login = $('.loginInput').val();
		if ($('.loginCheckBox').prop('checked')){
			document.cookie = 'login='+ $('.loginInput').val();
		}
		createOrJoinView.render();
	}
});

loginView = new LoginView;