/*jshint globalstrict: true*/
define('views/roomHeaderView', [
		'text!templates/roomTemplates/roomHeader.html',
		'backbone',
		'underscore'
], function(roomHeaderTemplate, Backbone, _) {
	let RoomHeaderView = Backbone.View.extend({
		el: '.content__header',
		template : _.template(roomHeaderTemplate),
		initialize: function(){},
		render: function(){
			$(this.el).html(this.template(this.model.toJSON()));
		}
	});

	return RoomHeaderView;

});
