var room;
var socket = io();
var gamers = {};
var resultsOfAGame;
var GameModel = Backbone.Model.extend({
	defaults: {
		loginName: 'anonymous',
		cards: [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 'infinity', '?', 'coffee'],
	},
	promptName: function() {
		$('#myModal').modal('hide');
		$('.createOrJoin').slideToggle();
		this.set('cards', [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 'infinity', '?', 'coffee']);
		this.set('loginName', $('.gamerName').val());
		gameView = new GameView;
	}
});



var GameView = Backbone.View.extend({
	el: '.content',
	model: gameModel,
	// idName: "myModal",
	events: {
		"click .nameSubmit" : "nameSubmit"
	},
	templateLogin: _.template("<%- loginName %>"),
	temlateCards: _.template("<br><% _.each(cards, function(card) { %><a class='btn btn-primary'><%= card %></a><% }); %>"),

	nameSubmit: function(){
		console.log(this);
		gameModel.promptName();
	},

	initialize: function() {
		console.log(this.model);
		console.log(this.render);
		console.log(this.listenTo);
		this.listenTo(this.model, "change", this.render);
	},
	render: function() {
		console.log('render');
		this.$el.append(this.templateLogin(this.model.attributes));
		this.$el.append(this.temlateCards(this.model.attributes));
		return this;
	}
});

var gameModel = new GameModel();

// gameModel.on('change:loginName', function(model, loginName) {
// 	console.log('DONE');
// });

$('#myModal').modal('show');

function setupRoom(){
	window.location.hash = '';
	$('.createOrJoin').slideToggle();
	$('.roomOptions').slideToggle();
}

function createRoom(){
	$('.roomOptions').slideToggle();
	$('.gameTable').slideToggle();
	if($('.roomName').val()){
		room = '/' + $('.roomName').val();
	}else{	
		room = '/' + makeid();
	}
	socket.emit('create room', room);
	socket = io(room);
	socketInit();
	window.location.hash = room;
	$('.alert-success').alert()
}	

function joinRoom(){
	if(window.location.hash) {
		socket = io(window.location.hash.substring(1));
		socketInit();
		$('.createOrJoin').slideToggle();
		$('.gameTable').slideToggle();
	} else {
	}
}

function socketInit(){
	socket.emit('add gamer', login);
	socket.on('update game', function(game){
		gamers = game;
		$(".table").empty();
		_.each(gamers, function(gamer){
			$(".table").append("<div class='" + gamer.login + " gamerCard'>" + gamer.login + "<br>" + gamer.point + "</div>");
			// console.log(gamer);
		})
	});
	socket.on('borders are', function(result){
		resultsOfAGame = result;
		console.log(resultsOfAGame);
	});
}

function vote(){
	var points = $('.points').val();
	socket.emit('gamer vote', login, points);
}

function makeid(){
	var text = "",
		possible = "0123456789";

	for( var i=0; i < 5; i++ )
	    text += possible.charAt(Math.floor(Math.random() * possible.length));

	return text;
}
function openCards(){
	socket.emit('choose borders');
}