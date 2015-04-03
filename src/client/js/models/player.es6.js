define('models/player', [
	'underscore',
	'backbone'
], function(_, Backbone){
	var Player = Backbone.Model.extend({
		defaults: {
			player : '',
			listOfProjects: '',  
			listOfOrganizations: '',
			playerAPI: ''
		}
	});
	return Player;
});
