/*jshint globalstrict: true*/
define([
    "backbone",
    "views/startView",
    "views/createOrJoinView"
], function(Backbone, StartView, CreateOrJoinView){
    let Router = Backbone.Router.extend({
        routes: {
            "login": "loadStartPage",
            "create_or_join": "loadCreateOrJoinPage",
            "go_to_room/:roomName" : "loadRoomPage",
            "*path": "loadStartPage"
        },

        loadStartPage: function(){
            this.navigate("#login", {trigger: true});
            window.startView = new StartView();
        },
        loadCreateOrJoinPage: function(){
            if(typeof window.player !== 'object'){
                this.navigate("#login", {trigger: true});
            }
        },
        loadRoomPage: function(roomName){
            console.log(roomName);
            if(typeof window.player !== 'object'){
                window.startView = new StartView();
            }
        },
    });
    return Router;
});
