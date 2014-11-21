// var room, login, cards;
var socket = io();

var tableModule = new Backbone.Model();
var gameZoneCollection = new Backbone.Collection();
var cardsToChooseCollection = new Backbone.Collection();

$.getScript("/client/js/views/startView.js");
$.getScript("/client/js/views/loginView.js");
$.getScript("/client/js/views/createOrJoinView.js");
$.getScript("/client/js/views/tableView.js");