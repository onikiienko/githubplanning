/*jshint globalstrict: true*/
define('collections/chat', [
	'models/chat',
	'backbone',
	'underscore'
	],
	function(ChatModel, Backbone, _){
		var Chat = Backbone.Collection.extend({
			addMessage: function(model){
				this.add(new ChatModel(model));
			}
		});

		return Chat;
	}
);