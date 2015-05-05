/*jshint globalstrict: true*/
define([
    "backbone",
    "views/startView"
], function(Backbone, startView){
    // var startView = new StartView();
    var Router = Backbone.Router.extend({
        routes: {
            "": "loadMainPage",
            "admin": "loadAdminPage",
            "admin/remove/:itemName": "removeItem",
            "admin/edit/:itemName": "editItem",
            "admin/new": "newItem",
            "type/:section/:subsection/:type": "loadTypePage",
            "manufacture/:parameters": "loadManufacturePage",
        },
        loadMainPage: function(){
            startView.initialize();
            startView.render();
        },
        // loadAdminPage: function(){
        //     adminView.render();
        // },
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
