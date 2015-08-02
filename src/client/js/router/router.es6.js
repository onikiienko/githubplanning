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
    'io/main',
    'data/service'
], function(Backbone, _, StartView, CreateView, RoomView, HeaderView, ContributorView, CardView, ChatView, TaskView, SelectCardView, io, appData){


    let headerView = new HeaderView({model: appData.headerModel});

    let Router = Backbone.Router.extend({
        routes: {
            "#": "loadStartPage",
            "create": "loadCreatePage",
            "room/:roomName" : "loadRoomPage",
            "*path": "loadStartPage"
        },

        signIn: function(){
            let providerName = localStorage.getItem('providerName');

            appData.changeProvider(providerName);

            let provider = appData.provider;

            provider.signInAndFillData();
        },

        getIssues: function(roomName){
            let provider = appData.provider;

            provider.getIssues(roomName.replace(';)', '/'));
        },

        loadStartPage: function(){
            this.navigate("#", {trigger: true});

            let startView = new StartView({ router: router });
        },

        loadCreatePage: function(){
            let createView = new CreateView({model: appData.projectsModel, router: router});

            if(_.isEmpty(appData.projectsModel.toJSON()) || _.isEmpty(appData.headerModel.toJSON())){
                this.signIn();
            }

        },

        loadRoomPage: function(roomName){
            if(!OAuth.create(localStorage.getItem('providerName'))){
                this.navigate("#", {trigger: true});
                return;
            }

            if(_.isEmpty(appData.projectsModel.toJSON()) || _.isEmpty(appData.headerModel.toJSON())){
                this.signIn();
            }

            this.getIssues(roomName);

            setTimeout(function(){
                appData.headerModel.set('projectName', roomName.replace(';)', '/'));
                io.enterRoom(roomName.replace(';)', '/'), appData.headerModel.get('currencyType'));
            }, 500);


            let roomView = new RoomView();
            let contributorView = new ContributorView({collection: appData.contributorsCollection});
            let selectCardView = new SelectCardView({collection: appData.selectCardsCollection});
            let cardView = new CardView({collection: appData.cardsCollection});
            let chatView = new ChatView({collection: appData.chatCollection});
            let taskView = new TaskView({collection: appData.tasksCollection});
        },
    });

    let router = new Router();

    Backbone.history.start();
});
