define('views/startView', [
		'text!/js/templates/startTemplate.html', 
		'models/player' , 
		'models/game', 
		'models/gitHubHandler',
		'models/trelloHandler',
		'views/createOrJoinView',
		'underscore',
], function(startTemplate, player, game, github, trello, createOrJoinView, _) {
	window.socket = io();
	window.socket.on('sendCurrentDataAbout', function(data){
		console.log(data);
	});
	var template = _.template(startTemplate);
	var player = new player;
	return {
		el : $('.content'),
		initialize: function(){
			this.render();
			this.createListners();
		},
		render: function(){
			this.el.html(template());
		},
		createListners: function(){
			var that = this;
			var signInBtn = $('.signIn');
			signInBtn.click(function(){
				that.singInAndGetData(trello);
			});
		},
		singInAndGetData: function(provider){
			provider.signIn()
			.done(function(api){
				player.set('playerAPI', api);
				window.api = api;
				return api;
			})
			.then(function(api){
				provider.getRepos(api).done(function(data){
					player.set('listOfProjects', data);
					console.log(data);
				});
				return api;
			})
			// .then(function(api){
			// 	provider.getOrganizations(api).done(function(data){
			// 		player.set('listOfOrganizations', data);	
			// 	})
			// 	return api;
			// })
			// .then(function(api){
			// 	provider.getUserData(api).done(function(data){
			// 		player.set('player', data);	
			// 	})
			// })
		}
	};
});
