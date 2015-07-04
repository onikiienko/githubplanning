/*jshint globalstrict: true*/
define('views/selectCard', [
		'text!templates/roomTemplates/selectCard.html',
		'backbone',
		'underscore'
], function(selectCardTemplate, Backbone, _) {
	let SelectCardView = Backbone.View.extend({
		el: '.card-select__cards',
		template : _.template(selectCardTemplate),
		events: {
      		"click .card" : "clickInCard"
    	},
		initialize: function(){
			this.render();
		},
		render: function(){
			let self = this;
			_.each(this.collection.toJSON(), function(card){
				$(self.el).append(self.template({card: card}));
			});
		},
		clickInCard: function(e){
			let value = $($($(e.target).closest(".card")).find(".card__rate")).attr("data");
			let content = $($($(e.target).closest(".card")).find(".card__rate")).text();
			let player = window.playerModel.toJSON().player;
			let playerObject = {
				avatar: player.avatar,
				login: player.login
			}
			window.cardsCollection.add({
				contributor: playerObject,
				card: {
					value: value,
					content: content
				}
			});
		}
	});

	return SelectCardView;

});
