/*jshint globalstrict: true*/
define('views/chat', [
		'text!templates/roomTemplates/message.html',
		'backbone',
		'underscore'
], function(userCommentTemplate, Backbone, _) {
	let RoomHeaderView = Backbone.View.extend({
		el: '.users-comments',
		template : _.template(userCommentTemplate),
		initialize: function(){},
		render: function(){
			$(this.el).html(this.template(this.model.toJSON()));
		}
	});

	return RoomHeaderView;

});
