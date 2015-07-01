/*jshint globalstrict: true*/
define('views/playgroundUserView', [
		'text!templates/roomTemplates/playgroundUser.html',
		'backbone',
		'underscore'
], function(playgroundUserTemplate, Backbone, _) {
	let PlaygroundUser = Backbone.View.extend({
		el: '.playground__users',
		template : _.template(playgroundUserTemplate),
		initialize: function(){
			this.listenTo(this.collection, "add", function(cotributor){
				this.model = cotributor;
				this.addUser();
			});
			this.listenTo(this.collection, "remove", function(cotributor){
				this.model = cotributor;
				this.removeUser();
			});
		},
		addUser: function(){
			$(this.el).append(this.template(this.model.toJSON()));
		},
		removeUser: function(){
			let login = this.model.toJSON().login;
			let usernameBlock = $(this.el).find('.user__name:contains(' + login + ')');
			let user = $(usernameBlock).closest('.user');

			$(user).remove();
		}
	});

	return PlaygroundUser;

});
