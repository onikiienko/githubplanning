var LoginView = Backbone.View.extend({
	el: '.loginView',
	render: function(){
		$('.loginView, .createOrJoinView, .tableView, .startView').css('display', 'none');
		this.$el.css('display', 'table');
	},
	events: {
		"click .loginBtn" : "loginSubmit",
		"click .loginWithGithybBtn" : "loginWithGithub"
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
	},
	loginWithGithub: function(){
		OAuth.initialize('DR4zizVjOy_1ZXdtlmn0GBLoTcA');
		OAuth.popup('github')
		.done(function(result) {
		  result.me()
			.done(function(me){
				tableModule.set({'login' : me.name});
				if ($('.loginCheckBox').prop('checked')){
					document.cookie = 'login=' + me.name;
				}
				if(window.location.hash.substring(2)){
					createOrJoinView.joinRoom(window.location.hash.substring(1));
				}else{
					createOrJoinView.render();
				}
			})
			.fail(function (err) {
				console.log(err);
			});
		})
		.fail(function (err) {
		  //handle error with err
		  console.log(err);
		});
	}
});

loginView = new LoginView();