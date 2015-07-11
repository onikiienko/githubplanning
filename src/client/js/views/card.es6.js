/*jshint globalstrict: true*/
define('views/card', [
		'text!templates/roomTemplates/card.html',
		'models/card',
		'io/main',
		'backbone',
		'underscore'
], function(cardTemplate, CardModel, io, Backbone, _) {
	let PlaygroundCard = Backbone.View.extend({
		el: '.cards',
		template : _.template(cardTemplate),
		events: {
			'click .card__btn' : 'removeCardFromCollection'
		},
		initialize: function(){
			this.listenTo(this.collection, "add", function(card){
				this.model = card;
				this.addCard();
			});
			this.listenTo(this.collection, "remove", function(card){
				this.model = card;
				this.removeCardFromLayout();
			});
		},
		addCard: function(){
			$(this.el).append(this.template(this.model.toJSON()));
		},
		removeCardFromLayout: function(){
			let avatar = this.model.get('contributor').avatar;
			let userBlock = $(this.el).find('[src="' + avatar + '"]');
			let card = $(userBlock).closest('.card');

			$(card).remove();
		},
		removeCardFromCollection: function(e){
			let value = $($($(e.target).closest(".card")).find(".card__rate")).attr("data");
			let content = $($($(e.target).closest(".card")).find(".card__rate")).text();
			let player = window.playerModel.get('player');
			let playerObject = {
				avatar: player.avatar,
				name: player.name
			};
			let model = new CardModel({ 
				contributor: playerObject, 
				card: { 
					value: value, 
					content: content 
				}
			});

			io.removeCard(model);
		}
	});

	return PlaygroundCard;

});
