/*jshint globalstrict: true*/
define('collections/contributors', [
	'backbone',
	'underscore'
	],
	function(Backbone, _){
		var Contributors = Backbone.Collection.extend({
			addContributor: function(model){
				if(!this.findWhere({login: model.login})){
					this.add(model);
				}
			},
			removeContributor: function(model){
				this.remove(this.filter(function (nextContributor) { return _.isEqual(nextContributor.get("login"), model.login);}));
			}
		});

		return Contributors;
	}
);