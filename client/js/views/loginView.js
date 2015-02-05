var LoginView = Backbone.View.extend({
	el: '.loginView',
	render: function(){
		$('.loginView, .createOrJoinView, .tableView, .startView').css('display', 'none');
		this.$el.css('display', 'table');
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