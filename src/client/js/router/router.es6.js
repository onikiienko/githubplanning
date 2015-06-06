/*jshint globalstrict: true*/
define([
    "backbone",
    "views/startView",
    "views/createOrJoinView",
    "views/roomView"
], function(Backbone, StartView, CreateOrJoinView, RoomView){
    let Router = Backbone.Router.extend({
        routes: {
            "#": "loadStartPage",
            "login": "loadStartPage",
            "create_or_join": "loadCreateOrJoinPage",
            "go_to_room/:roomName" : "loadRoomPage",
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
                window.startView = new StartView();
            }else{
                window.roomView = (window.roomView) ? window.roomView : new RoomView({model: window.player});
                window.roomView.render();
            }
        },
    });
    return Router;
});
