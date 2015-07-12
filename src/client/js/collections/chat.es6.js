/*jshint globalstrict: true*/
define('collections/chat', [
	'models/chat',
	'backbone',
	'underscore'
	],
	function(ChatModel, Backbone, _){
		var Chat = Backbone.Collection.extend({
			addMessage: function(data){
				this.add(data);
			}
		});

		return Chat;
	}
);