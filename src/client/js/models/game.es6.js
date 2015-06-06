/*jshint globalstrict: true*/
define('models/game', ['underscore', 'backbone'], function(_, Backbone){
	let Game = Backbone.Model.extend({
		defaults: {
			nameOfProject: '',
			issues: [], 
			collaborators: [],
			cardsSet: [{'0': 0}, {'0.5' : 1}, {'1' : 2}, {'2' : 3}, {'3' : 4}, {'5' : 5}, {'8' : 6}, {'13' : 7}, {'20' : 8}, {'40' : 9}, {'100' : 10}, {'infinity' : 11}, {'?' : 12}, {'coffee' : 13}],
			conversation: [{name: 'Bogdan Onikiienko', date: 'Sat Jun 06 2015 17:28:46 GMT+0300 (EEST)', body: 'Hi!'}],
			player: {
				name: '',
				login: '',
				avatar: ''
			}
		}
	});
	return Game;
});
