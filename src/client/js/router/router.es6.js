/*jshint globalstrict: true*/
define([
    "backbone",
    "views/startView",
    "views/createOrJoinView",
    "views/roomView",
    'views/roomHeaderView',
    'views/playgroundUserView',
    'views/playgroundCardView',
    'views/selectCardView'
], function(Backbone, StartView, CreateOrJoinView, RoomView, RoomHeaderView, PlaygroundUserView, PlaygroundCardView, SelectCardView){
    let Router = Backbone.Router.extend({
        routes: {
            "#": "loadStartPage",
            "login": "loadStartPage",
            "create_or_join": "loadCreateOrJoinPage",
            "room/:roomName" : "loadRoomPage",
            "*path": "loadStartPage"
        },

        loadStartPage: function(){
            this.navigate("#login", {trigger: true});
            window.startView = (window.startView) ? window.startView : new StartView();
            window.startView.render();
        },
        loadCreateOrJoinPage: function(){
            if(!window.player){
                this.navigate("#login", {trigger: true});
            }else{
                window.createOrJoinView = (window.createOrJoinView) ? window.createOrJoinView : new CreateOrJoinView({model: window.player});
                window.createOrJoinView.render();
            }
        },
        loadRoomPage: function(roomName){
            if(!window.player){
                this.navigate("#login", {trigger: true});
            }else{
                window.roomView = (window.roomView) ? window.roomView : new RoomView({model: window.game});
                window.roomView.render();

                window.roomHeaderView = (window.roomHeaderView) ? window.roomHeaderView : new RoomHeaderView({model: window.player});
                window.roomHeaderView.render();

                window.playgroundUserView = (window.playgroundUserView) ? window.playgroundUserView : new PlaygroundUserView({collection: window.contributors});
                
                window.selectCardView = (window.selectCardView) ? window.selectCardView : new SelectCardView({collection: window.selectCardCollection});
                
                window.playgroundCardView = (window.playgroundCardView) ? window.playgroundCardView : new PlaygroundCardView({collection: window.playgroundCards});
            }
        },
    });
    return Router;
});
