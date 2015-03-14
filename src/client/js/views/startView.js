require(['text!/js/templates/startTemplate.html', "/js/models/player.js"], function(startTemplate, player) {
	StartView = Backbone.View.extend({
		el: '.content',
		events: {
			"click .signIn" : "singInWithGitHub"
		},
		initialize: function(){
			socket = io();
			this.render();
		},
		render: function(){
			var template = _.template(startTemplate);
			$('.content').html(template());
		},
		singInWithGitHub: function(){
			// console.log(this.model);
			this.signIn();
		},
		signIn: function(){
			OAuth.initialize('DR4zizVjOy_1ZXdtlmn0GBLoTcA');
			OAuth.popup('github')
			.done(function(api) {
				window.player.set('playerAPI', api);
				api.get('/user/repos').done(function(data){
					window.player.set('listOfProjects', data);
					api.get('/user/orgs').done(function(data){
						window.player.set('listOfOrganizations', data);
						api.get('/user').done(function(data){
							window.player.set('player', data);
						});
					});
				});
			});
		}
	});
	new StartView({model : window.player});
	new CreateOrJoinView({model : window.player});
});


