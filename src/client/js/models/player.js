define([
	'underscore',
	'backbone'
], function(_, Backbone){
	var Player = Backbone.Model.extend({
		defaults: {
			player : '',
			listOfProjects: '',  
			listOfOrganizations: '', 
			issues: '', 
			collaborators: '',
			playerAPI: ''
		}
	});
	window.player = new Player();
});
