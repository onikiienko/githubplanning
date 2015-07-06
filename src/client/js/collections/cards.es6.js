/*jshint globalstrict: true*/
define('collections/cards', [
	'models/card',
	'backbone',
	'underscore'
	], function(CardModel, Backbone, _){
		var Cards = Backbone.Collection.extend({
			addCard: function(model){
				if(!this.findWhere(this.filter(function (nextCard) { return _.isEqual(nextCard.get("cotributor"), model.cotributor);}))){
					this.add(new CardModel(model));
				}else{
					this.remove(this.filter(function (nextCard) { return _.isEqual(nextCard.get("cotributor"), model.cotributor);}));
					this.add(new CardModel(model));
				}
			},
			removeCard: function(model){
				this.remove(this.filter(function (nextCard) { return _.isEqual(nextCard.get("cotributor"), model.cotributor);}));
			}
		});

		return Cards;
	});