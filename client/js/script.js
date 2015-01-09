// var room, login, cards;
var socket = io();

var tableModule = new Backbone.Model();
var gameZoneCollection = new Backbone.Collection();
var cardsToChooseCollection = new Backbone.Collection();
var gamersListCollection = new Backbone.Collection();

$.getScript("js/planningpoker.js");