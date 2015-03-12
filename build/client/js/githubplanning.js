require(['text!/js/templates/createOrJoinTemplate.html'], function(createOrJoinTemplate) {
	window.CreateOrJoinView = Backbone.View.extend({
		el: '.content',
		events: {
			"click .enterRoomBtn" : "createRoom"
		},
		isNewer: true,
		initialize: function(){
			this.render();
		},
		render: function(){
			var template = _.template(createOrJoinTemplate);
			$(this.el).html(template);
		},
		createRoom: function(){
			player.getIssues($('select option:selected').text());
			// tableModule.set({'room': $('.roomNameInput').val()});

			// var room  = '/' + tableModule.toJSON().room;
			// var currencyType = $('input:checked').prop('value');
			// var login = tableModule.toJSON().login;
			
			// socket.emit('enter room', room, currencyType, login);
			// socket = io(room);
			// this.socketInit();
			// window.location.hash = room;
		},
		joinRoom: function(room){
			tableModule.set({'room': room.substring(1)});
			var login = tableModule.toJSON().login;
			socket.emit('enter room', room, undefined, login);
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
			socket.on('flipCards', function(msg, login){
				$('.flipper').addClass('hover');
			});
		}
	});
});
require(['text!/js/templates/startTemplate.html', "/js/models/player.js"], function(startTemplate, player) {	
	StartView = Backbone.View.extend({
		el: '.content',
		events: {
			"click .signIn" : "singInWithGitHub"
		},
		initialize: function(){
			socket = io();
			this.render();
		},
		render: function(){
			socket.on('numberOfRooms', function(numberOfRooms){
				var template = _.template(startTemplate);
				$('.content').html(template({numberOfRoom: numberOfRooms}));
			});
		},
		singInWithGitHub: function(){
			OAuth.initialize('DR4zizVjOy_1ZXdtlmn0GBLoTcA');
			OAuth.popup('github')
				.done(function(api) {
					window.player.setPlayerAPI(api);
					window.player.getAccount();
					window.player.getListOfOrganizations();
					window.player.getListOfProjects();
					// get list of collaborators
					api.get('/repos/onikiienko/githubplanning/collaborators').done(function(b){
						console.log(b);
					});
				})
				.fail(function (err) {
				  //handle error with err
				  console.log(err);
				});
		}
	});
	new StartView();
});



var TableView = Backbone.View.extend({
	el: '.tableView',
	events: {
		"click .deckView" : "chooseACard",
		"click .restartRoundBtn" : "restartRound",
		"click .flipCardsBtn" : "flipCards",
		"click .sendMessage" : "sendMessage"
	},
	render: function(){
		$('.loginView, .createOrJoinView, .tableView, .startView').css('display', 'none');
		this.$el.css('display', 'block');
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
		$('.deckView').append(this.tempCardsToChoose(cardsToChooseCollection.toJSON()));
		return this;
	},
	renderGamersList: function(){
		$('.gamersListView').html(this.tempGamersList(gamersListCollection.toJSON()));
		return this;
	},
	tempGameZone: _.template(
		"<%for(var gamerModel in data) { %>"+
				"<div class='flip-container' data='<%= data[gamerModel].name %>'>"+
					"<div class='flipper'>"+
						"<div class='front'>"+
							"<%= data[gamerModel].name %>"+
						"</div>"+
						"<div class='back'>"+
							"<%= data[gamerModel].number.name %>"+
						"</div>"+
					"</div>"+
				"</div>"+
		"<% } %>",
		{variable: 'data'}
	),
	tempCardsToChoose: _.template(
		"<p>Choose a card:</p>"+
		"<%for(var card in data) { %>"+
				"<% for(var name in data[card]) { %>"+
					"<div class='cardToChoose' data='<%= data[card][name] %>'>"+
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
		var classOfCard = e.target.getAttribute('class');
		if (classOfCard=='cardToChoose'){
			var data = e.target.getAttribute('data');
			var name = e.target.textContent;
			socket.emit('vote', new Backbone.Model({name: tableModule.toJSON().login, number: {name : name, data : data}}));
		}
	},	
	restartRound: function(){
		socket.emit('restart');
	},
	flipCards: function(){
		socket.emit('flipCards');
	}
});

tableView = new TableView();
