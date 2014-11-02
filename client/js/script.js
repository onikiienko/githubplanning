var room;
var socket = io();
var gamers = {};
var resultsOfAGame;



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



var GameModel = Backbone.Model.extend({
	defaults: {
		loginName: null,
		gameTable: null
		// cards: [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 'infinity', '?', 'coffee'],
	},
	writeLogin: function(login) {
		if(login){
			this.set('loginName', login);
			return;
		}
		// this.set('cards', [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 'infinity', '?', 'coffee']);
		this.set('loginName', $('.loginInput').val());
	},
	updateTable: function(gameTable){
		this.set('gameTable', gameTable);
	}
});

var StartView = Backbone.View.extend({
	el: 'body',
	events: {
		"click .start" : "startGame",
	},
	startGame: function(){
		if(document.cookie){
			var login = this.getNameValueCookies('login');
			gameModel.writeLogin(login);
			var createOrJoinView = new CreateOrJoinView;
		}else{
			var loginView = new LoginView;
		}			
	},
	getNameValueCookies: function(name) {
  		var value = "; " + document.cookie;
  		var parts = value.split("; " + name + "=");
  		if (parts.length == 2) return parts.pop().split(";").shift();
	},
	initialize: function(){
		this.render();
	},
	render: function(){
		this.$el.append(
			'<div class="site-wrapper">'+
				'<div class="site-wrapper-inner">'+
					'<div class="cover-container">'+
						'<div class="masthead clearfix">'+
							'<div class="inner">'+
								'<h3 class="masthead-brand">Planning Poker</h3>'+
								'<ul class="nav masthead-nav">'+
									'<li class="active"><a href="#">Home</a></li>'+
									'<li><a href="#">About</a></li>'+
									'<li><a href="#">Contact</a></li>'+
								'</ul>'+
							'</div>'+
						'</div>'+
						'<div class="inner cover">'+
							'<h1 class="cover-heading">Planning Poker</h1>'+
							'<p class="lead">A realtime Planning Poker application for distributed Agile teams</p>'+
							'<p class="lead">'+
								'<a href="#" class="btn btn-lg btn-success start">Start</a>'+
							'</p>'+
							'<div class="table"></div>'+
						'</div>'+
						'<div class="mastfoot">'+
							'<div class="inner">'+
								'<p>Created by <a href="https://twitter.com/onikiienko">@onikiienko</a></p>'+
							'</div>'+
						'</div>'+
					'</div>'+
				'</div>'+
			'</div>'
	    );
	}
});

var LoginView = Backbone.View.extend({
	el: '.inner.cover',
	initialize: function() {
		this.render();
	},
	events: {
		"click .loginBtn" : "loginSubmit"
	},
	loginSubmit: function(){
		gameModel.writeLogin();
		if ($('.loginCheckBox').prop('checked')){
			document.cookie = 'login='+$('.loginInput').val();
		}
		var createOrJoinView = new CreateOrJoinView;
	},
	render: function(){
		this.$el.html(
			'<div class="form-signin login" role="form">' + 
		        '<h2 class="form-signin-heading">Please sign in</h2>' +
		        '<input type="login" class="form-control loginInput" placeholder="Login" required autofocus>' +
		        '<div class="checkbox">' +
		          	'<label>' +
		            	'<input type="checkbox" value="remember-me" class="loginCheckBox"> Remember me' +
		          	'</label>' +
	          	'</div>'+
		        '<button class="btn btn-lg btn-primary loginBtn" type="submit">Sign in</button>' +
	      	'</div>'
	    );
	}
});

var CreateOrJoinView = Backbone.View.extend({
	el: '.inner.cover',
	events: {
		"click .enterRoomBtn" : "enterRoomBtn"
	},
	enterRoomBtn: function(){
		var roomName = $('.roomNameInput').val();
		if($(roomName)){
			roomName = '/' + roomName;
		}else{	
			roomName = '/' + makeid();
		}
		socket.emit('create room', roomName);
		socket = io(roomName);
		this.socketInit();
	},
	socketInit: function(){
		socket.emit('add gamer', gameModel.attributes.loginName);
		socket.on('update game', function(game){
			gameModel.updateTable(game);
		});
		socket.on('borders are', function(result){
			resultsOfAGame = result;
			console.log(resultsOfAGame);
		});
	},
	render: function(){
		this.$el.html(    
		    '<h1 class="cover-heading">Enter to room</h1>'+
            '<p class="lead">Create your own room or join other.</p>'+
            	'<input type="default" class="form-control roomNameInput" placeholder="Room name" required autofocus>' +
            '</p>'+
            '<p class="lead">'+
            	'<button href="#" class="btn btn-lg btn-primary enterRoomBtn">Enter room</button>'+
            '</p>'
        );
	},
	initialize: function() {
		this.render()
	},
});

var TableView = Backbone.View.extend({
	el: '.inner.cover',
	templateLogin: _.template("<%- loginName %>"),
	templateCards: _.template("<br><% _.each(cards, function(card) { %><a class='btn btn-primary'><%= card %></a><% }); %>"),
	templateGame: _.template("<br><% _.each(gameTable, function(record) { %><div class=''><%= record.login %></div><div class=''><%= record.point %></div><% }); %>"),
	initialize: function() {
		this.listenTo(this.model, "set change", this.render);
	},
	render: function() {
		console.log(this.model.attributes);
		try{
			this.$el.append(this.templateLogin(this.model.attributes));
		}catch(e){}
		try{
			this.$el.append(this.templateGame(this.model.attributes));
		}catch(e){}
		// this.$el.append(this.temlateCards(this.model.attributes));
		return this;
	}
});

var gameModel = new GameModel;
var startView = new StartView();
// var tableView = new TableView({model:gameModel});
