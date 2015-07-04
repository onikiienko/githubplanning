/*jshint globalstrict: true*/
define('models/task', [
	'underscore',
	'backbone'
], function(_, Backbone){
	let Task = Backbone.Model.extend({
		defaults: {
			body : '',
			creator: '',
			date: '',
			title: ''
		}
	});
	return Task;
});
