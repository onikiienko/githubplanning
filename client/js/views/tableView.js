var TableView = Backbone.View.extend({
	el: '.inner.cover',
	events: {
		"click .voteBtn" : "chooseACard"
	},
	render: function(){
		this.$el.html(
			'<div class="form-signin vote" role="form">' + 
				'<div class="table-cards"></div>' +
		        '<h2 class="form-signin-heading">Your number is</h2>' +
		        '<input type="login" class="form-control voteInput" placeholder="Number" required autofocus>' +
		        '<button class="btn btn-lg btn-primary voteBtn">Vote</button>' +
	      	'</div>'
		);
		$('.table-cards').append(this.tempCardsDiv(gamer));
		$('.table-cards').append(this.tempGameDiv(gamer));
		return this;
	},
	tempCardsDiv: _.template("<% for(var i in cards) { %><div class='card'><%= cards[i] %></div><% } %>"),
	tempGameDiv: _.template("<% if(table.models[0]){for(var i in table.models) { %><div class='card'><%= table.models[i].attributes.name %></div><div class='card'><%= table.models[i].attributes.number %></div><% }} %>"),
	chooseACard: function(){
		socket.emit('vote', new Hand({name: gamer.login, number: $('.voteInput').val()}));
	}
});

tableView = new TableView;


// var compiled = _.template("<% print('Hello ' + epithet); %>");
// compiled({epithet: "stooge"});