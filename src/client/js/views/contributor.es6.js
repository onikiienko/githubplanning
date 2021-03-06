/*jshint globalstrict: true*/
define('views/contributor', [
	'text!templates/roomTemplates/contributor.html',
	'backbone',
	'underscore'
], function(cotributorTemplate, Backbone, _) {
	let PlaygroundUser = Backbone.View.extend({
		el: '.playground__users',
		
		template : _.template(cotributorTemplate),
		
		initialize: function(){
			this.listenTo(this.collection, "add", function(contributor){
				this.model = contributor;
				this.addUser();
			});
			
			this.listenTo(this.collection, "remove", function(contributor){
				this.model = contributor;
				this.removeUser();
			});
		},
		
		addUser: function(){
			$(this.el).append(this.template(this.model.toJSON()));
		},
		
		removeUser: function(){
			let name = this.model.get('name');
			let usernameBlock = $(this.el).find('.user__name:contains(' + name + ')');
			let user = $(usernameBlock).closest('.user');

			$(user).remove();
		}
	});

	return PlaygroundUser;

});
