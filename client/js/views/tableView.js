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
			'<h3 class="tableNameView"></h3>'+
			'<br>'+
			'<h3 class="taskNameView"></h3>'+
			'<br>'+
			'<div class="table">'+
				'<div class="gameZoneView"></div>'+
				'<button href="#" class="btn btn-lg btn-primary restartRoundBtn">Restart task</button>'+
				'<button href="#" class="btn btn-lg btn-primary flipCardsBtn">Flip cards</button>'+
			'</div>'+
			'<br>'+
			'<div class="cardsToChooseView"></div>'+
			'<div class="chatAndTaskList">'+
				'<div class="gamersListView"></div>'+
				'<div class="taskListView"></div>'+
				'<div class="chatView">'+
					'<div id="messages"></div>'+
  					'<input type="text" class="chatInput" placeholder="Message" required autofocus>'+
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
		"<%for(var card in data) { %>"+
				"<% for(var name in data[card]) { %>"+
					"<div class='cardToChoose thumbnail' data='<%= data[card][name] %>'>"+
						"<%= name %>"+
					"</div>"+
				"<% } %>"+
		"<% } %>",
		{variable: 'data'}
	),
	tempTableName: _.template("Room: <%= data.room %>, Login: <%= data.login %>",
		{variable: 'data'}
	),
	tempGamersList: _.template(
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
