/*jshint globalstrict: true*/
define('views/startView', [
		'text!templates/startTemplate.html', 
		'models/player' , 
		'login/githubHandler',
		'socketIO',
		'backbone',
		'underscore'
], function(startTemplate, Player, github, io, Backbone, _) {
	let StartView = Backbone.View.extend({
		el: '.content',
		events: {
			"click .signIn" : "singInAndGetData"
		},
		template : _.template(startTemplate),
		initialize: function(){
			window.socket = io();
			// window.socket.on('sendCurrentDataAbout', function(data){
			// 	console.log(data);
			// });
		},
		render: function(){
			$(this.el).html(this.template());
		},
		singInAndGetData: function(){
			window.player = new Player();
			window.provider = github;
			window.provider.signInAndFillData(window.player);
			window.app_router.navigate('#create_or_join', {trigger: true});
		}
	});

	return StartView;

});
