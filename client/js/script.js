var room, login, cards;
var socket = io();
// var gamers = {};
// var resultsOfAGame;

// var Game = Backbone.Collection.extend({
//   model: Hand
// });

var Gamer = Backbone.Model.extend({
	room: undefined,
	login: undefined,
	cards: undefined
});

var gamer = new Gamer;

var Hand = Backbone.Model.extend();

var StartView = Backbone.View.extend({
	el: 'body',
	events: {
		"click .start" : "startGame",
	},
	startGame: function(){
		if(document.cookie){
			var login = this.getNameValueCookies('login');
			new CreateOrJoinView;
		}else{
			new LoginView;
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

new StartView;

var LoginView = Backbone.View.extend({
	el: '.inner.cover',
	initialize: function() {
		this.render();
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
	},
	events: {
		"click .loginBtn" : "loginSubmit"
	},
	loginSubmit: function(){
		gamer.login = $('.loginInput').val();
		if ($('.loginCheckBox').prop('checked')){
			document.cookie = 'login='+ $('.loginInput').val();
		}
		new CreateOrJoinView;
	}
});

var CreateOrJoinView = Backbone.View.extend({
	el: '.inner.cover',
	events: {
		"click .enterRoomBtn" : "enterRoom"
	},
	initialize: function() {
		this.render();
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
	enterRoom: function(){
		gamer.room = $('.roomNameInput').val();
		var room  = '/' + gamer.room;
		socket.emit('enter room', room, gamer.login, 'standardCurrency');
		socket = io(room);
		this.socketInit();
		new Table;
	},
	socketInit: function(){
		socket.on('typeCards', function(typeCards){
			gamer.cards = typeCards;
		});
	}
});

var Table = Backbone.View.extend({
	el: '.inner.cover',
	events: {
		"click .voteBtn" : "chooseACard"
	},
	initialize: function() {
		this.render();
	},
	render: function(){
		this.$el.html(
			'<div class="form-signin vote" role="form">' + 
		        '<h2 class="form-signin-heading">Your number is</h2>' +
		        '<input type="login" class="form-control voteInput" placeholder="Number" required autofocus>' +
		        '<button class="btn btn-lg btn-primary voteBtn">Vote</button>' +
	      	'</div>'
		);
		return this;
	},
	templateGame: _.template("<br><% for(var record in gameTable){ %><div class=''><%= record.name %></div><div class=''><%= record.voteNumber %></div><% }; %>"),
	chooseACard: function(){
		socket.emit('vote', new Hand({name: gamer.login, number: $('.voteInput').val()}));
	}
	// updateTableView: function(){
	// 	// var roomName = $('.roomNameInput').val();
	// 	// if(roomName){
	// 	// 	roomName = '/' + roomName;
	// 	// }else{	
	// 	// 	roomName = '/' + makeid();
	// 	// }
	// 	// socket.emit('enter room', roomName);
	// 	// socket = io(roomName);
	// 	// this.socketInit();

	// 	//HERE SHOULD BE SOCKET CONNECTION
	// 	gameModel.updateTable();
	// 		if(this.model.attributes){
	// 			var gameTable = gameModel.toJSON();
	// 			// this.$el.append(this.templateGame(gameTable));
	// 			console.log(gameTable);
	// 			// for(var record in gameTable){console.log(record.name, record.voteNumber);}
	// 		}
	// },
});


// var TableView = Backbone.View.extend({
// 	el: '.inner.cover',
// 	templateLogin: _.template("<%- loginName %>"),
// 	templateCards: _.template("<br><% _.each(cards, function(card) { %><a class='btn btn-primary'><%= card %></a><% }); %>"),
// 	initialize: function() {
// 		this.listenTo(this.model, "set change", this.render);
// 	},
// 	render: function() {
// 		// console.log(this.model.attributes);
// 		// try{
// 		// 	this.$el.append(this.templateLogin(this.model.attributes));
// 		// }catch(e){}
// 		try{
			
// 		}catch(e){}
// 		// this.$el.append(this.temlateCards(this.model.attributes));
// 		return this;
// 	}
// });

// var gameModel = new GameModel;

// var tableView = new TableView({model:gameModel});
