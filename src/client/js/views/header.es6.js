/*jshint globalstrict: true*/
define('views/header', [
		'text!templates/roomTemplates/header.html',
		'backbone',
		'underscore',
    	'data/service',
    	'io/main'
], function(headerTemplate, Backbone, _, appData, io) {
	let Header = Backbone.View.extend({
		el: '.content__header',

		events: {
			'click .main-header__logo' : 'changeRoom',
			'click .main-header__user' : 'userMenu'
		},

		template : _.template(headerTemplate),

		initialize: function(options){
			this.router = options.router;
			_.bindAll(this, 'render');
        	this.model.bind('change', this.render);
			this.render();
		},

		render: function(){
        	$(this.el).html(this.template(this.model.toJSON()));
		},

		changeRoom: function(){
			localStorage.removeItem('roomName');
		},

		userMenu: function () {
			localStorage.removeItem('provider');
			localStorage.removeItem('providerName');

			let contributorObject = {
				avatar: this.model.get('avatar'), 
				name: this.model.get('name')
			};
			let contributor = appData.contributorsCollection.findWhere(contributorObject);
			let contributorId = contributor.get('socketId');
			
			if (this.model.get('projectName')){ 
				io.leaveRoom(contributorId);
			}
			
			appData.headerModel.clear();
			
			this.router.navigate('/', {trigger: true});
		}
	});

	return Header;

});
