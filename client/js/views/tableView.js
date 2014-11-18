var TableView = Backbone.View.extend({
	el: '.inner.cover',
	events: {
		"click .voteBtn" : "chooseACard"
	},
	render: function(){
		this.$el.html(
			'<div class="form-signin vote" role="form">' + 
				'<div class="table"></div>' +
		        '<h2 class="form-signin-heading">Your number is</h2>' +
		        '<input type="login" class="form-control voteInput" placeholder="Number" required autofocus>' +
		        '<button class="btn btn-lg btn-primary voteBtn">Vote</button>' +
	      	'</div>'
		);
		return this;
	},
	templateGame: _.template("<br><% for(var model in game.table.models){ %><div class=''><%= model.attributes.name %></div><div class=''><%= record.voteNumber %></div><% }; %>"),
	chooseACard: function(){
		socket.emit('vote', new Hand({name: gamer.login, number: $('.voteInput').val()}));
	}
});

tableView = new TableView;