/*jshint globalstrict: true*/
define('models/issue', [
	'underscore',
	'backbone'
], function(_, Backbone){
	let Issue = Backbone.Model.extend({
		defaults: {
			body : '',
			creator: '',
			date: '',
			title: ''
		}
	});
	return Issue;
});
