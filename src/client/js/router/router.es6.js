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
    'data/service',
    'login/trello',
    'login/github',
    'login/bitbucket'
], function(Backbone, _, StartView, CreateView, RoomView, HeaderView, ContributorView, CardView, ChatView, TaskView, SelectCardView, io, appData, providerTrello, providerGithub, providerBitbucket){

    let headerView = new HeaderView({model: appData.headerModel});

    let Router = Backbone.Router.extend({
        routes: {
            "#": "loadStartPage",
            "create": "loadCreatePage",
            "room/:roomName" : "loadRoomPage",
            "*path": "loadStartPage"
        },

        signIn: function(){
            this.setProvider();
            return appData.provider.signInAndFillData();
        },

        setProvider: function () {
            let providerName = localStorage.getItem('providerName');

            switch(providerName) {
                case 'trello':
                    appData.provider = providerTrello;
                    break;
                case 'github':
                    appData.provider = providerGithub;
                    break;
                case 'bitbucket':
                    appData.provider = providerBitbucket;
            }
        },

        loadStartPage: function(){
            if (localStorage.getItem('providerName')) {
                this.navigate("#create", {trigger: true});
                return;
            }

            let startView = new StartView({ router: router });
        },

        loadCreatePage: function(){
            if (!localStorage.getItem('providerName')) {
                this.navigate("#", {trigger: true});
                return;
            }

            if (localStorage.getItem('roomName')) {
                this.navigate('#room/' + localStorage.getItem('roomName'), {trigger: true});
                return;
            }

            this.signIn();
            let createView = new CreateView({model: appData.projectsModel, router: router});
        },

        loadRoomPage: function(roomName){
            if (!localStorage.getItem('providerName')) {
                this.navigate("#", {trigger: true});
                return;
            }

            if (_.isEmpty(appData.provider)){
                localStorage.setItem('roomName', roomName);
                this.signIn();
            }
            
            appData.provider.getIssues(roomName.replace(';)', '/'));
            
            
            io.enterRoom(roomName.replace(';)', '/'), appData.headerModel.get('currencyType'));
            
            let roomView = new RoomView();
            let contributorView = new ContributorView({collection: appData.contributorsCollection});
            let selectCardView = new SelectCardView({collection: appData.selectCardsCollection});
            let cardView = new CardView({collection: appData.cardsCollection});
            let chatView = new ChatView({collection: appData.chatCollection});
            let taskView = new TaskView({collection: appData.tasksCollection});
        }
    });

    let router = new Router();

    Backbone.history.start();
});
