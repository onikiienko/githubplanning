var TableView = Backbone.View.extend({
	el: '.inner.cover',
	events: {
		"click .cardsToChooseView" : "chooseACard",
		"click .restartRoundBtn" : "restartRound",
		"click .flipCardsBtn" : "flipCards",
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
				'<div class="chatView row"></div>'+
			'</div>'
		);
		$('.tableNameView').append(this.tempTableName(tableModule.toJSON()));
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
