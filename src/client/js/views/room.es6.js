/*jshint globalstrict: true*/
define('views/room', [
		'text!templates/roomTemplates/room.html',
		'collections/cards',
		'backbone',
		'underscore'
], function(roomTemplate, CardsCollection, Backbone, _) {
	let RoomView = Backbone.View.extend({
		el: '.wrapper',
		events: {
			"click .tab__nav" : "showTab"
		},
		template : _.template(roomTemplate),
		initialize: function(){
    		window.cardsCollection = new CardsCollection();
    		this.render();
		},
		render: function(){
			$(this.el).html(this.template());
		},
		showTab: function(e){
			let target = $(e.target);
			let bind = target.attr('bind');
			let query = ".tab__content--item[bind='" + bind + "']";
			let tabNav = $(target.closest('.tab__nav'));
			let allnavItems = tabNav.find('li');
			let allTabPanelBodyItem = $('.tab__content');
			let tabItems = $('.tab__content--item');
			let currentTabPanelBodyItem = allTabPanelBodyItem.find(query);

			////handle navigate
			allnavItems.removeClass('tab__nav--active');
			target.addClass('tab__nav--active');

			////handle body
			tabItems.removeClass('content--active');
			tabItems.hide();
			currentTabPanelBodyItem.toggleClass('content--active');
			currentTabPanelBodyItem.fadeIn();
		}
	});

	return RoomView;

});
