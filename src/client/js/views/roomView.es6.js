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
			"click .navBarItem" : "showTab",
			"click .issue" : "setIssue",
			"click .deleteCard" : "deleteCardFromDesk"
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
		},
		setIssue: function(e){
			let issueName = $.trim($(e.target).closest('.issue').find('.issueHeaderTitle').html());
			this.model.set('currentIssue', {name: issueName})
		},
		deleteCardFromDesk: function(e){
			let login = $(e.target).closest('.cardOnDesk').attr('login');
		},
		showTab: function(e){
			let target = $(e.target);
			let bind = target.attr('bind');
			let query = ".tabPanelBodyItem[bind='" + bind + "']";
			let tabPanel = $(target.closest('.tabPanel'));
			let allTabPanelBodyItem = tabPanel.find('.tabPanelBodyItem');
			let allnavItems = tabPanel.find('.navBarItem');
			let currentTabPanelBodyItem = tabPanel.find(query);

			//handle navigate
			allnavItems.removeClass('active');
			target.addClass('active');
			//handle body
			allTabPanelBodyItem.removeClass('active');
			allTabPanelBodyItem.hide();
			currentTabPanelBodyItem.toggleClass('active');
			currentTabPanelBodyItem.fadeIn();
		}
	});

	return RoomView;

});
