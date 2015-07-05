/*jshint globalstrict: true*/
define('collections/cards', ['backbone'],
	function(Backbone){
		var PlaygroundCards = Backbone.Collection.extend({
			addCard: function(model){
				if(!this.findWhere({cotributor: model.cotributor})){
					this.add(model);
				}else{
					this.remove(model);
					this.add(model);
				}
			}
		});

		return PlaygroundCards;
	});