/*jshint globalstrict: true*/
define('views/playgroundCardView', [
		'text!templates/roomTemplates/playgroundCard.html',
		'backbone',
		'underscore'
], function(playgroundCardTemplate, Backbone, _) {
	let PlaygroundCard = Backbone.View.extend({
		el: '.cards',
		template : _.template(playgroundCardTemplate),
		initialize: function(){
			this.listenTo(this.collection, "add", function(card){
				this.model = card;
				this.addCard();
			});
			this.listenTo(this.collection, "remove", function(card){
				this.model = card;
				this.removeCard();
			});
		},
		addCard: function(){
			$(this.el).append(this.template(this.model.toJSON()));
		},
		removeCard: function(){
			let login = this.model.toJSON().login;
			let usernameBlock = $(this.el).find('.user__name:contains(' + login + ')');
			let user = $(usernameBlock).closest('.user');

			$(user).remove();
		}
	});

	return PlaygroundCard;

});
