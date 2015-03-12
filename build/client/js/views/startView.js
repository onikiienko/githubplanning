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
			socket.on('numberOfRooms', function(numberOfRooms){
				var template = _.template(startTemplate);
				$('.content').html(template({numberOfRoom: numberOfRooms}));
			});
		},
		singInWithGitHub: function(){
			OAuth.initialize('DR4zizVjOy_1ZXdtlmn0GBLoTcA');
			OAuth.popup('github')
				.done(function(api) {
					window.player.setPlayerAPI(api);
					window.player.getAccount();
					window.player.getListOfOrganizations();
					window.player.getListOfProjects();
					// get list of collaborators
					api.get('/repos/onikiienko/githubplanning/collaborators').done(function(b){
						console.log(b);
					});
				})
				.fail(function (err) {
				  //handle error with err
				  console.log(err);
				});
		}
	});
	new StartView();
});


