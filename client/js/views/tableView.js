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
