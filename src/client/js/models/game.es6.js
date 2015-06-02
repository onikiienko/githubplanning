/*jshint globalstrict: true*/
define('models/game', ['underscore', 'backbone'], function(_, Backbone){
	let Game = Backbone.Model.extend({
		defaults: {
			issues: '', 
			collaborators: '',
			type: '',
			name: ''
		}
	});
	return Game;
});
