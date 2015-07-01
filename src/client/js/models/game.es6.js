/*jshint globalstrict: true*/
define('models/game', ['underscore', 'backbone'], function(_, Backbone){
	let Game = Backbone.Model.extend({
		defaults: {
			nameOfProject: '',
			issues: [],
			currentIssue:{},
			cardsSet: [],
			conversation: [{name: 'Bogdan Onikiienko', avatar: 'https://avatars.githubusercontent.com/u/3997468?v=3',  date: 'Sat Jun 06 2015 17:28:46 GMT+0300 (EEST)', body: 'Hi!'}, {name: 'Bogdan Onikiienko', avatar: 'https://avatars.githubusercontent.com/u/3997468?v=3',  date: 'Sat Jun 06 2015 17:28:46 GMT+0300 (EEST)', body: 'Hi!'}],
			player: {
				name: '',
				login: '',
				avatar: ''
			},
			cardsOnDesk: [{
				player: {
					name: 'Bogdan Onikiienko',
					avatar: 'https://avatars.githubusercontent.com/u/3997468?v=3',
					login: 'onikiienko'
				},
				card: {
					key: 2,
					number: 0.5
				}
			}]
		}
	});
	return Game;
});
