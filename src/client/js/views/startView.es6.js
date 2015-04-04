define('views/startView', [
		'text!/js/templates/startTemplate.html', 
		'models/player' , 
		'models/game', 
		'models/githubHandler',
		'models/trelloHandler',
		'models/bitbucketHandler',
		'views/createOrJoinView',
		'underscore',
], function(startTemplate, player, game, github, trello, bitbucket, createOrJoinView, _) {
	window.socket = io();
	window.socket.on('sendCurrentDataAbout', function(data){
		console.log(data);
	});
	var template = _.template(startTemplate);
	var player = new player;
	var objectForTemplate;
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
				that.singInAndGetData(bitbucket);
			});
		},
		singInAndGetData: function(provider){
			provider.signIn()
			.then(function(api){
				player.set('playerAPI', api);
				return api;
			})
			.then(function(api){
				provider.getRepos(api).done(function(data){
					player.set('listOfProjects', data);
				});
				return api;
			})
			.then(function(api){
				provider.getUserData(api).done(function(data){
					player.set('player', data);
					window.player = player;
					objectForTemplate = provider.prepareObjectForTemplate(player);
					console.log(objectForTemplate);
				})
				return api;
			})
		}
	};
});
