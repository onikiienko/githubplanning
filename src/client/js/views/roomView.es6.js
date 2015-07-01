/*jshint globalstrict: true*/
define('views/roomView', [
		'text!templates/roomTemplates/roomLayout.html', 
		'login/githubHandler',
		'collections/playgroundCards',
		'backbone',
		'underscore'
], function(roomTemplate, github, PlaygroundCards, Backbone, _) {
	let RoomView = Backbone.View.extend({
		el: '.wrapper',
		events: {
			// "click .navBarItem" : "showTab",
			// "click .issue" : "setIssue",
			// "click .deleteCard" : "deleteCardFromDesk",
			// "click .sendBtn" : "sendMessage",
			// "keyup .textInputForChat" : "keyPressEventHandler",
			// "click .card" : "setCard"
		},
		template : _.template(roomTemplate),
		initialize: function(){
			_.bindAll(this, 'render');

    		window.playgroundCards = new PlaygroundCards();
		},
		render: function(){
			try{
				$(this.el).html(this.template(this.model.toJSON()));
				$(".posts").scrollTop($(".posts")[0].scrollHeight);
			}catch(e){
				console.log(e);
			}
		},
		sendMessage: function(){
			let body = $('.textInputForChat').val();
			let player = window.player.toJSON().player;
			let playerObject = {
				name: player.name,
				avatar: player.avatar,
				login: player.login
			};

			let conversation = this.model.toJSON().conversation;
			conversation.push({
				name: playerObject.name,
				avatar: playerObject.avatar,
				date: new Date(),
				body: body
			})
			this.model.set('conversation', conversation);
			this.render();
		},
		keyPressEventHandler: function(e){
			if(e.keyCode === 13){
				this.sendMessage();
			}
		},
		setCard: function(e){
			let target = $(e.target).closest('.card');
			let key = target.attr('data');
			let number = $.trim(target.find('span').html());
			let player = window.player.toJSON().player;
			let playerObject = {
				name: player.name,
				avatar: player.avatar,
				login: player.login
			};
			let cardsOnDesk = this.model.toJSON().cardsOnDesk;
			cardsOnDesk.push({
				player: playerObject,
				card: {
					key: key,
					number: number
				}
			})
			this.model.set('cardsOnDesk', cardsOnDesk);
			this.render();
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
