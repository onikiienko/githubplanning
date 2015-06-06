/*jshint globalstrict: true*/
define('views/roomView', [
		'text!templates/roomTemplate.html', 
		'models/player' , 
		'login/githubHandler',
		'backbone',
		'underscore'
], function(roomTemplate, Player, github, Backbone, _) {
	let RoomView = Backbone.View.extend({
		el: '.content',
		events: {
			// "click .signIn" : "singInAndGetData"
		},
		template : _.template(roomTemplate),
		initialize: function(){
			_.bindAll(this, 'render');
    		this.model.bind('change', this.render);
		},
		render: function(){
			try{
				$(this.el).html(this.template(this.model.toJSON()));
			}catch(e){
				console.log(e);
			}
		}
	});

	return RoomView;

});
