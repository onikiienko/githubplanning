/*jshint globalstrict: true*/
define('models/chat', [
	'underscore',
	'backbone'
], function(_, Backbone){
	let Chat = Backbone.Model.extend({
		defaults: {
			contributor : '',
			text: '',
			date: ''
		}
	});
	return Chat;
});
