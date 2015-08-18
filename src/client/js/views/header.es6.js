/*jshint globalstrict: true*/
define('views/header', [
		'text!templates/roomTemplates/header.html',
		'backbone',
		'underscore',
    'data/service'
], function(headerTemplate, Backbone, _, appData) {
	let Header = Backbone.View.extend({
		el: '.content__header',

		events: {
			'click .main-header__logo' : 'changeRoom',
			'click .main-header__user' : 'userMenu'
		},

		template : _.template(headerTemplate),

		initialize: function(){
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
      appData.headerModel.clear();
      Backbone.history.navigate('/', {trigger: true});
    }
	});

	return Header;

});
