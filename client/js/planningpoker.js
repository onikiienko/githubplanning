var StartView = Backbone.View.extend({
	el: 'body',
	events: {
		"click .start" : "startGame"

	},
	initialize: function(){
		socket.on('numberOfRooms', function(numberOfRooms){
			$('.roomsNumberView').html('It has been created ' + numberOfRooms + ' number of rooms. Join us!');
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
			'<div class="site-wrapper">'+
				'<div class="site-wrapper-inner">'+
					'<div class="cover-container">'+
						'<div class="masthead clearfix">'+
							'<div class="inner">'+
								'<h3 class="masthead-brand">Planning Poker</h3>'+
							'</div>'+
						'</div>'+
						'<div class="inner cover">'+
							'<h1 class="cover-heading">Planning Poker</h1>'+
							'<p class="lead roomsNumberView"></p>'+
							'<p class="lead">A realtime Planning Poker application for distributed Agile teams</p>'+
							'<p class="lead">'+
								'<a href="#" class="btn btn-lg btn-success start submit">Start</a>'+
							'</p>'+
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

startView = new StartView();
var LoginView = Backbone.View.extend({
	el: '.inner.cover',
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
		        '<button class="btn btn-lg btn-success loginBtn" type="submit">Sign in</button>' +
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
	el: '.inner.cover',
	events: {
		"click .enterRoomBtn" : "enterRoom"
	},
	render: function(){
		this.$el.html(    
		    '<h1 class="cover-heading">Enter to room</h1>'+
            '<p class="lead">Create your own room or join other.</p>'+
            	'<input type="default" class="form-control roomNameInput" placeholder="Room name" required autofocus>' +
            '</p>'+
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
            '<p class="lead">'+
            	'<button href="#" class="btn btn-lg btn-success enterRoomBtn submit">Enter room</button>'+
            '</p>'
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
		socket.on('connectionReady', function(cards, table, gamers){
			
			gamersListCollection.set(gamers);
			
			cardsToChooseCollection.set(cards);
			tableView.render();
			tableView.renderCardsToChoose();
			tableView.renderGamersList();
			
			if(table[0]){
				gameZoneCollection.set(table);
				tableView.renderGameZone();
			}
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
	el: '.inner.cover',
	events: {
		"click .cardsToChooseView" : "chooseACard",
		"click .restartRoundBtn" : "restartRound",
		"click .flipCardsBtn" : "flipCards",
		"click .sendMessage" : "sendMessage"
	},
	render: function(){
		this.$el.html(
			'<h3 class="masthead-brand tableNameView"></h3>'+
			'<br>'+
			'<h3 class="masthead-brand taskNameView"></h3>'+
			'<br>'+
			'<div class="table row">'+
				'<div class="gameZoneView row"></div>'+
				'<button href="#" class="btn btn-lg btn-primary restartRoundBtn">Restart task</button>'+
				'<button href="#" class="btn btn-lg btn-primary flipCardsBtn">Flip cards</button>'+
			'</div>'+
			'<br>'+
			'<div class="cardsToChooseView row"></div>'+
			'<div class="chatAndTaskList row">'+
				'<ul class="list-group gamersListView"></ul>'+
				'<div class="taskListView row"></div>'+
				'<div class="chatView row">'+
					'<div id="messages"></div>'+
  					'<input type="login" class="form-control chatInput" placeholder="Message" required autofocus>'+
  					'<button href="#" class="btn btn-lg btn-primary sendMessage">Send</button>'+
    			'</div>'+
			'</div>'
		);
		$('.tableNameView').append(this.tempTableName(tableModule.toJSON()));
		return this;
	},
	renderMessage: function(msg, login){
		$('<div/>', {
    		text: login + " : " + msg
		}).appendTo('#messages');
		$("#messages").animate({ scrollTop: $(document).height() }, "slow");
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
			"<div class='col-xs-6 col-md-3'>"+
				"<div class='thumbnail' data='<%= data[gamerModel].name %>'>"+
					"<%= data[gamerModel].name %>"+
					"<br>"+
					"<%= data[gamerModel].number.name %>"+
					"(<%= data[gamerModel].number.data %>)"+
				"</div>"+
			"</div>"+
		"<% } %>",
		{variable: 'data'}
	),
	tempCardsToChoose: _.template(
		"<%for(var card in data) { %>"+
			"<div class='col-xs-6 col-md-3'>"+
				"<% for(var name in data[card]) { %>"+
					"<div class='thumbnail' data='<%= data[card][name] %>'>"+
						"<%= name %>"+
					"</div>"+
				"<% } %>"+
			"</div>"+
		"<% } %>",
		{variable: 'data'}
	),
	tempTableName: _.template("Room: <%= data.room %>, Login: <%= data.login %>",
		{variable: 'data'}
	),
	tempGamersList: _.template(
		"<%for(var gamer in data) { %>"+
				"<li class='list-group-item'>"+
					"<%= data[gamer].name %>"+
				"</li>"+
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
		var name = e.target.innerText;
		socket.emit('vote', new Backbone.Model({name: tableModule.toJSON().login, number: {name : name, data : data}}));
	},	
	restartRound: function(){
		// var data = e.target.getAttribute('data');
		// var name = e.target.innerText;
		socket.emit('restart');
	}
});

tableView = new TableView();
