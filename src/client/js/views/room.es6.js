/*jshint globalstrict: true*/
define('views/room', [
		'text!templates/roomTemplates/room.html',
		'collections/cards',
		'collections/chat',
		'models/chat',
		'io/main',
		'backbone',
		'underscore'
], function(roomTemplate, CardsCollection, ChatCollection, ChatModel, io, Backbone, _) {
	let RoomView = Backbone.View.extend({
		el: '.wrapper',
		events: {
			"click .tab__nav" : "showTab",
			"click .users-comments__btn" : "sendMessage"
		},
		template : _.template(roomTemplate),
		initialize: function(){
    		window.cardsCollection = new CardsCollection();
    		window.chatCollection = new ChatCollection();
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
		},
		sendMessage: function(){
			let player = window.playerModel.get('player');
			let playerObject = {
				avatar: player.avatar,
				name: player.name
			};
			let text = $('.textarea').val();
			$('.textarea').val('');

			let model = new ChatModel({
				contributor: playerObject,
				text: text,
				date: new Date()
			})

			io.sendMessage(model);
		}
	});

	return RoomView;

});
