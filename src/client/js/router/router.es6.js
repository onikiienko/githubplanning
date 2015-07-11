/*jshint globalstrict: true*/
define([
    "backbone",
    "views/start",
    "views/create",
    "views/room",
    "views/header",
    "views/contributor",
    "views/card",
    "views/chat",
    "views/selectCard"
], function(Backbone, StartView, CreateView, RoomView, HeaderView, ContributorView, CardView, ChatView, SelectCardView){
    let Router = Backbone.Router.extend({
        routes: {
            "#": "loadStartPage",
            "create": "loadCreatePage",
            "room/:roomName" : "loadRoomPage",
            "*path": "loadStartPage"
        },

        loadStartPage: function(){
            this.navigate("#", {trigger: true});
            window.startView = (window.startView) ? window.startView : new StartView();
        },
        loadCreatePage: function(){
            if(!window.playerModel){
                this.navigate("#", {trigger: true});
            }else{
                window.createView = (window.createView) ? window.createView : new CreateView({model: window.playerModel});
            }
        },
        loadRoomPage: function(roomName){
            if(!window.playerModel){
                this.navigate("#", {trigger: true});
            }else{
                window.roomView = (window.roomView) ? window.roomView : new RoomView();
                window.headerView = (window.headerView) ? window.headerView : new HeaderView({model: window.playerModel});
                window.contributorView = (window.contributorView) ? window.contributorView : new ContributorView({collection: window.contributorsCollection});
                window.selectCardView = (window.selectCardView) ? window.selectCardView : new SelectCardView({collection: window.selectCardsCollection});
                window.cardView = (window.cardView) ? window.cardView : new CardView({collection: window.cardsCollection});
                window.chatView = (window.chatView) ? window.chatView : new ChatView({collection: window.chatCollection});
            }
        },
    });
    return Router;
});
