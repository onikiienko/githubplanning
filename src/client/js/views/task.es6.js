/*jshint globalstrict: true*/
define('views/task', [
		'text!templates/roomTemplates/task.html',
		'backbone',
		'underscore'
], function(taskTemplate, Backbone, _) {
	let Task = Backbone.View.extend({
		el: '.task__container',
		template : _.template(taskTemplate),
		initialize: function(){
			var self = this;
			this.collection.bind('add', function(task){
				self.model = task;
				self.addTask();
			});
		},
		addTask: function(){
			$(this.el).append(this.template(this.model.toJSON()));
		}
	});

	return Task;

});
