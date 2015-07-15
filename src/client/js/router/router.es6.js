/*jshint globalstrict: true*/
define([
    'backbone',
    'underscore',
    'views/start',
    'views/create',
    'views/room',
    'views/header',
    'views/contributor',
    'views/card',
    'views/chat',
    'views/task',
    'views/selectCard',
    'login/github',
    'io/main',
    'data/service'
], function(Backbone, _, StartView, CreateView, RoomView, HeaderView, ContributorView, CardView, ChatView, TaskView, SelectCardView, github, io, data){
    
    let provider = github;

    let headerView = new HeaderView({model: data.headerModel});
    
    let Router = Backbone.Router.extend({
        routes: {
            "#": "loadStartPage",
            "create": "loadCreatePage",
            "room/:roomName" : "loadRoomPage",
            "*path": "loadStartPage"
        },

        loadStartPage: function(){
            this.navigate("#", {trigger: true});
            let startView = new StartView({provider: provider, router: router});
        },
        loadCreatePage: function(){
            if(_.isEmpty(data.playerModel.toJSON()) || _.isEmpty(data.headerModel.toJSON())){ 
                provider.signInAndFillData();
            }

            let createView = new CreateView({model: data.playerModel, provider: provider, router: router});
        },
        loadRoomPage: function(roomName){
            if(!OAuth.create('github')){
                this.navigate("#", {trigger: true});
                return;
            }

            if(_.isEmpty(data.playerModel.toJSON())){
                provider.signInAndFillData();
                provider.getIssues(roomName.replace(';)', '/'));
                setTimeout(function(){io.enterRoom(roomName)}, 1000);
            }


            let roomView = new RoomView({roomName: roomName});
            let contributorView = new ContributorView({collection: data.contributorsCollection});
            let selectCardView = new SelectCardView({collection: data.selectCardsCollection});
            let cardView = new CardView({collection: data.cardsCollection});
            let chatView = new ChatView({collection: data.chatCollection});
            let taskView = new TaskView({collection: data.tasksCollection});
        },
    });

    let router = new Router();
    
    Backbone.history.start();
});
