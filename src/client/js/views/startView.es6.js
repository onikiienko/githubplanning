/*jshint globalstrict: true*/
define('views/startView', [
		'text!templates/startTemplate.html', 
		'models/player' , 
		'login/githubHandler',
		'login/trelloHandler',
		'login/bitbucketHandler',
		'socketIO',
		'backbone',
		'underscore'
], function(startTemplate, Player, github, trello, bitbucket, io, Backbone, _) {
	var StartView = Backbone.View.extend({
		el: '.content',
		events: {
			"click .signIn" : "singInAndGetData"
		},
		template : _.template(startTemplate),
		initialize: function(){
			window.socket = io();
			window.socket.on('sendCurrentDataAbout', function(data){
				console.log(data);
			});
			this.render();
			this.createListners();
		},
		render: function(){
			$(this.el).html(this.template());
		},
		createListners: function(){
			var that = this;
			var signInBtn = $('.signIn');
		},
		singInAndGetData: function(){
			window.player = new Player();
			var player = window.player;
			var provider = bitbucket;
			provider
			.signIn()
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
				})
				return api;
			})
			.then(function(){
				window.createOrJoinDataForTemplate = provider.prepareObjectForTemplate(window.player);
			})
			.fail(function (e) {
		        //handle errors here
		        console.log(400, 'An error occured');
		    });
		}
	});

	return StartView;

});
