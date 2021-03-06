/*jshint globalstrict: true*/
define('collections/cards', [
	'models/card',
	'backbone',
	'underscore'
	], function(CardModel, Backbone, _){
		var Cards = Backbone.Collection.extend({
			addCard: function(model){
				this.add(model);
			},
			removeCard: function(model){
				this.remove(this.filter(function (nextCard) { return _.isEqual(nextCard.get("contributor"), model.contributor);}));
			}
		});

		return Cards;
	});