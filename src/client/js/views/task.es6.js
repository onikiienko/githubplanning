/*jshint globalstrict: true*/
define('views/chat', [
		'text!templates/roomTemplates/message.html',
		'backbone',
		'underscore'
], function(taskTemplate, Backbone, _) {
	let Header = Backbone.View.extend({
		el: '.tasks',
		template : _.template(taskTemplate),
		initialize: function(){},
		render: function(){
			$(this.el).html(this.template(this.model.toJSON()));
		}
	});

	return Header;

});
