/*jshint globalstrict: true*/
define('models/player', [
	'underscore',
	'backbone'
], function(_, Backbone){
	let Player = Backbone.Model.extend({
		defaults: {
			player : '',
			listOfProjects: '',
			playerAPI: ''
		}
	});
	return Player;
});
