/*jshint globalstrict: true*/
define('views/start', [
		'text!templates/start.html',
		'models/player',
		'login/github',
		'io/main',
		'backbone',
		'underscore'
], function(startTemplate, PlayerModel, github, io, Backbone, _) {
	let StartView = Backbone.View.extend({
		el: '.wrapper',
		events: {
			"click .signIn" : "singInAndGetData"
		},
		template : _.template(startTemplate),
		initialize: function(){
			this.render();
		},
		render: function(){
			$(this.el).html(this.template());
		},
		singInAndGetData: function(){
			window.playerModel = new PlayerModel();
			window.provider = github;
			window.provider.signInAndFillData(window.playerModel);
			window.app_router.navigate('#create', {trigger: true});
		}
	});

	return StartView;

});
