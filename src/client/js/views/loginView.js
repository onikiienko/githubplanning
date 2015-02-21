require(["/js/models/player.js"], function(player) {
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
				window.player.getName(result)
					.done(
						function(){
							window.player.getAvatar();
							window.player.getListOfProjects();
							window.player.getListOfOrganizations();
							//old code
							window.tableModule.set({'login' : window.player.name});
							$('.loginInput').val(window.player.name);
						}
					);
				//get issues of a project
				result.get('/repos/onikiienko/githubplanning/issues').done(function(b){
					console.log(b);
				});
				// get list of collaborators
				result.get('/repos/onikiienko/githubplanning/collaborators').done(function(b){
					console.log(b);
				});
			})
			.fail(function (err) {
			  //handle error with err
			  console.log(err);
			});
		}
	});
window.loginView = new LoginView();
});
