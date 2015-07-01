/*jshint globalstrict: true*/
define('models/contributor', [
	'underscore',
	'backbone'
], function(_, Backbone){
	let Contributor = Backbone.Model.extend({
		defaults: {
			avatar : '',
			login: ''
		}
	});
	return Contributor;
});
