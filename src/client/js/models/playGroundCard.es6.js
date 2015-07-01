/*jshint globalstrict: true*/
define('models/playGroundCard.es6', [
	'underscore',
	'backbone'
], function(_, Backbone){
	let PlayGroundCard = Backbone.Model.extend({
		defaults: {
			contributor : '',
			card: ''
		}
	});
	return PlayGroundCard;
});
