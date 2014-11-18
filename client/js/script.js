var room, login, cards;
var socket = io();

var Gamer = Backbone.Model.extend({
	room: undefined,
	login: undefined,
	cards: undefined,
	table: new Backbone.Collection()
});

var gamer = new Gamer;

var Hand = Backbone.Model.extend();

$.getScript("/client/js/views/startView.js");
$.getScript("/client/js/views/loginView.js");
$.getScript("/client/js/views/createOrJoinView.js");
$.getScript("/client/js/views/tableView.js");
