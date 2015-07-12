/*jshint globalstrict: true*/
define('views/chat', [
		'text!templates/roomTemplates/message.html',
		'backbone',
		'underscore'
], function(commentTemplate, Backbone, _) {
	let RoomHeaderView = Backbone.View.extend({
		el: '.msg-container',
		template : _.template(commentTemplate),
		initialize: function(){
			this.listenTo(this.collection, "add", function(message){
				this.model = message;
				this.addCard();
			});
			this.render();
		},
		render: function(){
			let self = this;
			_.each(this.collection.toJSON(), function(message){
				message.time = this.getTime(message.date);
				$(self.el).append(self.template(message));
			});
		},
		addCard: function(){
			this.model.set('time', this.getTime(this.model.get('date')));
			$(this.el).append(this.template(this.model.toJSON()));
		},
		getTime: function(time){
			let date = new Date(time);
			return date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
		}
	});

	return RoomHeaderView;

});
