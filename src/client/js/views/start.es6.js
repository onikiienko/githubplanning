/*jshint globalstrict: true*/
define('views/start', [
		'text!templates/start.html',
		'io/main',
		'backbone',
		'underscore'
], function(startTemplate, io, Backbone, _) {
	let StartView = Backbone.View.extend({
		el: '.main-content',
		events: {
			"click .signIn" : "singInAndGetData"
		},
		template : _.template(startTemplate),
		initialize: function(options){
			this.provider = options.provider;
			this.render();
		},
		render: function(){
			$(this.el).html(this.template());
		},
		singInAndGetData: function(){
			window.app_router.navigate('#create', {trigger: true});
			this.provider.signInAndFillData();
		}
	});

	return StartView;

});
