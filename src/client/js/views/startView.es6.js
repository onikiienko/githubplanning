/*jshint globalstrict: true*/
define('views/startView', [
		'text!templates/startTemplate.html', 
		'models/player' , 
		'login/githubHandler',
		'login/trelloHandler',
		'login/bitbucketHandler',
		'underscore',
		'https://cdn.socket.io/socket.io-1.3.5.js'
], function(startTemplate, Player, github, trello, bitbucket, _, io) {
	window.socket = io();
	window.socket.on('sendCurrentDataAbout', function(data){
		console.log(data);
	});
	var template = _.template(startTemplate);
	var player = new Player();
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
