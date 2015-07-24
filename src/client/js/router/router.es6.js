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
], function(Backbone, _, StartView, CreateView, RoomView, HeaderView, ContributorView, CardView, ChatView, TaskView, SelectCardView, github, io, appData){
    
    let provider = github;

    let headerView = new HeaderView({model: appData.headerModel});
    
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
            let createView = new CreateView({model: appData.projectsModel, provider: provider, router: router});

            if(_.isEmpty(appData.projectsModel.toJSON()) || _.isEmpty(appData.headerModel.toJSON())){ 
                provider.signInAndFillData();
            }

        },
        loadRoomPage: function(roomName){
            if(!OAuth.create('github')){
                this.navigate("#", {trigger: true});
                return;
            }

            setTimeout(function(){
                appData.headerModel.set('projectName', roomName.replace(';)', '/'));
                io.enterRoom(roomName, appData.headerModel.get('currencyType'));
            }, 500);

            let roomView = new RoomView();
            let contributorView = new ContributorView({collection: appData.contributorsCollection});
            let selectCardView = new SelectCardView({collection: appData.selectCardsCollection});
            let cardView = new CardView({collection: appData.cardsCollection});
            let chatView = new ChatView({collection: appData.chatCollection});
            let taskView = new TaskView({collection: appData.tasksCollection});

            provider.getIssues(roomName.replace(';)', '/'));

            if(_.isEmpty(appData.headerModel.toJSON())){   
                provider.signInAndFillData();
            }
        },
    });

    let router = new Router();
    
    Backbone.history.start();
});
