var StartView = Backbone.View.extend({
	el: 'body',
	events: {
		"click .start" : "startGame"
	},
	initialize: function(){
		socket.on('numberOfRooms', function(numberOfRooms){
			$('.roomsNumberView').html('It has been created ' + numberOfRooms + ' rooms.');
		});
		this.render();
	},
	startGame: function(){
		var login = this.getNameValueCookies('login');
		if(login){
			tableModule.set({'login': login});
			createOrJoinView.render();
		}else{
			loginView.render();
		}			
	},
	getNameValueCookies: function(name) {
  		var value = "; " + document.cookie;
  		var parts = value.split("; " + name + "=");
  		if (parts.length == 2) return parts.pop().split(";").shift();
	},
	render: function(){
		this.$el.append(
	'<nav class="navbar navbar-inverse navbar-fixed-top headerDiv" role="navigation">'+
      '<div class="container">'+
        '<div class="navbar-header">'+
          '<a class="navbar-brand" href="#">Scrum Poker</a>'+
        '</div>'+
      '</div>'+
    '</nav>'+
    '<div class="contentDiv text-center">'+
	    '<div class="jumbotron vcenter">'+
	      '<div class="container">'+
			'<h1 class="cover-heading">Join Us!</h1>'+
			'<p class="lead roomsNumberView"></p>'+
			'<p class="lead">A realtime Planning Poker application for distributed Agile teams</p>'+
			'<p class="lead">'+
				'<a href="#" class="btn btn-lg btn-success start submit" type="submit">Start</a>'+
			'</p>'+
	      '</div>'+
	    '</div>'+
    '</div>'+
    '<div class="footerDiv footer">'+
    '</div>'
	    );
	}
});

startView = new StartView();
var LoginView = Backbone.View.extend({
	el: '.contentDiv',
	render: function(){
		this.$el.html(
			'<div class="loginDiv jumbotron vcenter" role="form">' + 
				'<div class="container">'+
			        '<h2>Please sign in</h2>' +
			        '<input type="text" class="loginInput" placeholder="Login" required autofocus="true">' +
			        '<div class="checkbox">' +
			          	'<label>' +
			            	'<input type="checkbox" value="remember-me" class="loginCheckBox"> Remember me' +
			          	'</label>' +
		          	'</div>'+
			        '<button class="btn btn-lg btn-success loginBtn">Sign in</button>' +
		        '</div>'+
	      	'</div>'
	    );
	},
	events: {
		"click .loginBtn" : "loginSubmit"
	},
	loginSubmit: function(){
		var login = $('.loginInput').val();
		tableModule.set({'login' : login});
		if ($('.loginCheckBox').prop('checked')){
			document.cookie = 'login=' + login;
		}
		createOrJoinView.render();
	}
});

loginView = new LoginView();
var CreateOrJoinView = Backbone.View.extend({
	el: '.contentDiv',
	events: {
		"click .enterRoomBtn" : "enterRoom"
	},
	isNewer: true,
	render: function(){
		this.$el.html(    
			'<div class="jumbotron vcenter" role="form">' + 
				'<div class="container">'+
				    '<h1>Enter to room</h1>'+
		            '<p>Create your own room or join other.</p>'+
		            '<input type="text" class="roomNameInput" placeholder="Room name" required autofocus="true">' +
					'<br>'+
					'<br>'+
					'<div class="currencyType">'+
						'<div class="radio-inline">'+
							'<label>'+
								'<input type="radio" name="inlineRadioOptions" id="inlineRadio1" value="standardCurrency" checked>'+
									'Standard'+
								'</label>'+
						'</div>'+
						'<div class="radio-inline">'+
							'<label>'+
								'<input type="radio" name="inlineRadioOptions" id="inlineRadio2" value="tShirtCurrency">'+
								'T-shirt'+
							'</label>'+
						'</div>'+
						'<div class="radio-inline">'+
							'<label>'+
								'<input type="radio" name="inlineRadioOptions" id="inlineRadio3" value="fibonacciCurrency">'+
								'Fibonacci'+
							'</label>'+
						'</div>'+
					'</div>'+
					'<br>'+
		            '<p>'+
		            	'<button href="#" class="btn btn-lg btn-success enterRoomBtn submit">Enter room</button>'+
		            '</p>'+
				'</div>'+
			'</div>'

        );
	},
	enterRoom: function(){
		tableModule.set({'room': $('.roomNameInput').val()});

		var room  = '/' + tableModule.toJSON().room;
		var currencyType = $('input:checked').prop('value');
		var login = tableModule.toJSON().login;
		
		socket.emit('enter room', room, currencyType, login);
		socket = io(room);
		this.socketInit();
	},
	socketInit: function(){
		var that = this;
		socket.on('connectionReady', function(cards, table, gamers){
			if (that.isNewer){
				tableView.render();
				cardsToChooseCollection.set(cards);
				tableView.renderCardsToChoose();
				if(table.length){
					gameZoneCollection.set(table);
					tableView.renderGameZone();
				}
				that.isNewer = false;
			}		
			gamersListCollection.set(gamers);
			tableView.renderGamersList();
			
		});
		socket.on('updateTable', function(table, gamers){
			gameZoneCollection.set(table);
			if (gamers){
				gamersListCollection.set(gamers);
			}
			tableView.renderGameZone();
			tableView.renderGamersList();
		});
		socket.on('chat message', function(msg, login){
			tableView.renderMessage(msg, login);
		});
	}
});

createOrJoinView = new CreateOrJoinView();
var TableView = Backbone.View.extend({
	el: '.contentDiv',
	events: {
		"click .cardsToChooseView" : "chooseACard",
		"click .restartRoundBtn" : "restartRound",
		"click .flipCardsBtn" : "flipCards",
		"click .sendMessage" : "sendMessage"
	},
	render: function(){
		this.$el.html(
			'<div class="contentDiv text-center">' + 
				'<div class="jumbotron vcenter" role="form">' + 
					'<div class="container">' + 


						'<div class="rightGameView">' + 
							'<div class="taskListView">' + 
								'Task list' + 
								'<div class="taskList"></div>' + 
								'<input type="text" class="taskInput" placeholder="Task name">' + 
								'<button href="#" class="btn btn-lg btn-primary addTask">Add</button>' + 
							'</div>' + 
							'<div class="taskResultsListView">' + 
								'Vote results' + 
								'<div class="taskList"></div>' + 							
							'</div>' + 
							'<div class="chatView">' + 
								'Chat' + 
								'<div class="messages"></div>' + 
								'<input type="text" class="chatInput" placeholder="Message" required="" autofocus="true">' + 
								'<button href="#" class="btn btn-lg btn-primary sendMessage">Send</button>' + 
							'</div>' + 
						'</div>' + 

					'<div class="leftGameView">' + 
						'<div class="gamersListView">Gamers:</div>' + 
						'<div class="tableNameView"></div>' + 
						'<div class="taskNameView">' + 
							'<p>Task#1</p>'+
						'</div>' + 
						'<div class="table">' + 
							'<button href="#" class="btn btn-lg btn-primary restartRoundBtn">Restart task</button>' + 
							'<button href="#" class="btn btn-lg btn-primary flipCardsBtn">Flip cards</button>' + 
							'<div class="gameZoneView">' + 
							'</div>' + 
						'</div>' + 
						'<div class="cardsToChooseView">' + 
						'</div>' + 
					'</div>' + 
						
					'</div>' + 
				'</div>' + 
			'</div>'
		);

		$('.tableNameView').append(this.tempTableName(tableModule.toJSON()));
		return this;
	},
	renderMessage: function(msg, login){
		$('<div/>', {
    		text: login + " : " + msg
		}).appendTo('.messages');
		$(".messages").animate({ scrollTop: $(document).height() }, "slow");
		return this;
	},
	renderGameZone: function(){
		$('.gameZoneView').html(this.tempGameZone(gameZoneCollection.toJSON()));
		return this;
	},
	renderCardsToChoose: function(){
		$('.cardsToChooseView').append(this.tempCardsToChoose(cardsToChooseCollection.toJSON()));
		return this;
	},
	renderGamersList: function(){
		$('.gamersListView').html(this.tempGamersList(gamersListCollection.toJSON()));
		return this;
	},
	tempGameZone: _.template(
		"<%for(var gamerModel in data) { %>"+
				"<div class='thumbnail' data='<%= data[gamerModel].name %>'>"+
					"<%= data[gamerModel].name %>"+
					"<br>"+
					"<%= data[gamerModel].number.name %>"+
					"(<%= data[gamerModel].number.data %>)"+
				"</div>"+
		"<% } %>",
		{variable: 'data'}
	),
	tempCardsToChoose: _.template(
		"<p>Choose a card:</p>"+
		"<%for(var card in data) { %>"+
				"<% for(var name in data[card]) { %>"+
					"<div class='cardToChoose thumbnail' data='<%= data[card][name] %>'>"+
						"<%= name %>"+
					"</div>"+
				"<% } %>"+
		"<% } %>",
		{variable: 'data'}
	),
	tempTableName: _.template("<div class='tableRoomView'><h3>Room: <%= data.room %></h3></div><div class='tableLoginView'><h3>Login: <%= data.login %></h3></div>",
		{variable: 'data'}
	),
	tempGamersList: _.template(
		"<p>List of Gamers:</p>"+
		"<%for(var gamer in data) { %>"+
				"<div>"+
					"<%= data[gamer].name %>"+
				"</div>"+
		"<% } %>",
		{variable: 'data'}
	),
	sendMessage: function(){
		var msg = $('.chatInput').val();
		var login = tableModule.toJSON().login;
		socket.emit('chat message', msg, login);
		$('.chatInput').val('');
		return false;
	},
	chooseACard: function(e){
		var data = e.target.getAttribute('data');
		var classOfCard = e.target.getAttribute('class');
		if (classOfCard == "cardToChoose thumbnail"){
			var name = e.target.innerText;
			socket.emit('vote', new Backbone.Model({name: tableModule.toJSON().login, number: {name : name, data : data}}));
		}
	},	
	restartRound: function(){
		socket.emit('restart');
	}
});

tableView = new TableView();

// Hide Header on on scroll down
var didScroll = false;
var lastScrollTop = 0;
var delta = 5;
var navbarHeight = $('.headerDiv').outerHeight();

$(window).scroll(function(event){
    didScroll = true;
});

setInterval(function() {
    if (didScroll) {
        hasScrolled();
        didScroll = false;
    }
}, 50);

function hasScrolled() {
    var st = $(this).scrollTop();
    
    // Make sure they scroll more than delta
    if(Math.abs(lastScrollTop - st) <= delta)
        return;
    
    // If they scrolled down and are past the navbar, add class .nav-up.
    // This is necessary so you never see what is "behind" the navbar. 
    if (st > lastScrollTop && st > navbarHeight){
        // Scroll Down
        $('.headerDiv').removeClass('nav-down').addClass('nav-up');
    } else {
        // Scroll Up
        if(st + $(window).height() < $(document).height()) {
            $('.headerDiv').removeClass('nav-up').addClass('nav-down');
        }
    }
    
    lastScrollTop = st;
}