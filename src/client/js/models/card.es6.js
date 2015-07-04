/*jshint globalstrict: true*/
define('models/card', [
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
