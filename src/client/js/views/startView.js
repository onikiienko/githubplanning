require(['text!/js/templates/startTemplate.html', "/js/models/player.js"], function(startTemplate, player) {	
	StartView = Backbone.View.extend({
		el: '.content',
		events: {
			"click .btn" : "singInWithGitHub"
		},
		initialize: function(){
			window.socket = io();
			this.render();
		},
		render: function(){
			window.socket.on('numberOfRooms', function(numberOfRooms){
				var template = _.template(startTemplate);
				$('.content').html(template({numberOfRoom: numberOfRooms}));
			});
		},
		singInWithGitHub: function(){
			OAuth.initialize('DR4zizVjOy_1ZXdtlmn0GBLoTcA');
			OAuth.popup('github')
			.done(function(result) {
				window.player.getName(result)
					.done(
						function(){
							window.player.getAvatar();
							window.player.getListOfProjects();
							window.player.getListOfOrganizations();
							window.player.getAvatar();
							//old code
							window.tableModule.set({'login' : window.player.name});
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
				new CreateOrJoinView();
			})
			.fail(function (err) {
			  //handle error with err
			  console.log(err);
			});
		}
	});
	new StartView();
});


