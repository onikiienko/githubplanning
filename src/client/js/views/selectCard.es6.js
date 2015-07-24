/*jshint globalstrict: true*/
define('views/selectCard', [
	'text!templates/roomTemplates/selectCard.html',
	'models/card',
	'io/main',
	'backbone',
	'underscore',
	'data/service'
], function(selectCardTemplate, CardModel, io, Backbone, _, appData) {
	let SelectCardView = Backbone.View.extend({
		el: '.card-select__cards',
		
		template : _.template(selectCardTemplate),
		
		events: {
      		"click .card" : "clickInCard"
    	},
		
		initialize: function(){
			var self = this;
			this.collection.bind('add', function(model){
				self.model = model;
				self.render();
			});
		},
		
		render: function(){
			$(this.el).append(this.template({card: this.model.toJSON()}));
		},
		
		clickInCard: function(e){
			let value = $($($(e.target).closest(".card")).find(".card__rate")).attr("data");
			let content = $($($(e.target).closest(".card")).find(".card__rate")).text();

			let playerObject = {
        		avatar: appData.headerModel.get('avatar'),
        		name: appData.headerModel.get('name')
			};

			let model = new CardModel({ 
				contributor: playerObject, 
				card: { 
					value: value, 
					content: content 
				}
			});

			io.selectCard(model);
		}
	});

	return SelectCardView;

});
