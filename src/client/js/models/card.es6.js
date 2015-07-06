/*jshint globalstrict: true*/
define('models/card', [
	'underscore',
	'backbone'
], function(_, Backbone){
	let Card = Backbone.Model.extend({
		defaults: {
			contributor : '',
			card: ''
		}
	});
	return Card;
});
