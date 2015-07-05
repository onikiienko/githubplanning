/*jshint globalstrict: true*/
define('collections/contributors', ['backbone'],
	function(Backbone){
		var Contributors = Backbone.Collection.extend({
			addMember: function(model){
				if(!this.findWhere(model)){
					this.add(model);
				}
			}
		});

		return Contributors;
	}
);