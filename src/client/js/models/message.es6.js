/*jshint globalstrict: true*/
define('models/message', [
	'underscore',
	'backbone'
], function(_, Backbone){
	let Message = Backbone.Model.extend({
		defaults: {
			avatar : '',
			name: '',
			date: '',
			text: ''
		}
	});
	return Message;
});