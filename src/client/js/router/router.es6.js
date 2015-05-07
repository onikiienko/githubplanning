/*jshint globalstrict: true*/
define([
    "backbone",
    "views/startView",
    "views/createOrJoinView"
], function(Backbone, StartView, CreateOrJoinView){
    var Router = Backbone.Router.extend({
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
            // else{
                // window.createOrJoinView = new CreateOrJoinView();
            // }
        },
        loadRoomPage: function(roomName){
            console.log(roomName);
            if(typeof window.player !== 'object'){
                window.startView = new StartView();
            }
            // else{
                // window.createOrJoinView = new CreateOrJoinView();
            // }
        },
        // removeItem: function(itemName){
        //     items.removeItem(itemName);
        // },
        // editItem: function(itemName){
        //     editView.render(itemName);
        // },
        // newItem: function(){
        //     newView.render();
        // },              
        // loadTypePage: function(section, subsection, type){
        //     itemView.render({section : section, subsection : subsection, type : type});
        // },
        // loadManufacturePage: function(manufacture){
        //     alert(manufacture);
        // }
    });
    return Router;
    // // Initiate the router
    // var app_router = new AppRouter();
    // // Start Backbone history a necessary step for bookmarkable URL's
    // Backbone.history.start();
});
