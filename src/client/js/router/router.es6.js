/*jshint globalstrict: true*/
define([
    "backbone",
    "underscore",
    "views/start",
    "views/create",
    "views/room",
    "views/header",
    "views/contributor",
    "views/card",
    "views/chat",
    "views/task",
    "views/selectCard",
    'collections/contributors',
    'collections/selectCards',
    'collections/tasks',
    'collections/cards',
    'collections/chat',
    'models/header',
    'models/player',
    'login/github',
    'io/main'
], function(Backbone, _, StartView, CreateView, RoomView, HeaderView, ContributorView, CardView, ChatView, TaskView, SelectCardView, ContributorsCollection, SelectCardsCollection, TasksCollection, CardsCollection, ChatCollection, HeaderModel, PlayerModel, github, io){
    
    window.contributorsCollection = new ContributorsCollection();
    window.selectCardsCollection = new SelectCardsCollection();
    window.cardsCollection = new CardsCollection();
    window.chatCollection = new ChatCollection();
    window.tasksCollection = new TasksCollection();
    
    window.headerModel = new HeaderModel();
    window.playerModel = new PlayerModel();

    window.selectCardsCollection.add([{'0': 0}, {'0.5' : 1}, {'1' : 2}, {'2' : 3}, {'3' : 4}, {'5' : 5}, {'8' : 6}, {'13' : 7}, {'20' : 8}, {'40' : 9}, {'100' : 10}, {'?' : 12}]);
    
    let provider = github;

    window.headerView = (window.headerView) ? window.headerView : new HeaderView({model: window.headerModel});
    
    let Router = Backbone.Router.extend({
        routes: {
            "#": "loadStartPage",
            "create": "loadCreatePage",
            "room/:roomName" : "loadRoomPage",
            "*path": "loadStartPage"
        },

        loadStartPage: function(){
            this.navigate("#", {trigger: true});
            window.startView = (window.startView) ? window.startView : new StartView({provider: provider});
        },
        loadCreatePage: function(){
            if(_.isEmpty(window.playerModel.toJSON()) || _.isEmpty(window.headerModel.toJSON())){ 
                provider.signInAndFillData();
            }
            if(!OAuth.create('github')){
                this.navigate("#", {trigger: true});
                return;
            }

            window.createView = (window.createView) ? window.createView : new CreateView({model: window.playerModel, provider: provider});
        },
        loadRoomPage: function(roomName){
            if(!OAuth.create('github')){
                this.navigate("#", {trigger: true});
                return;
            }

            if(_.isEmpty(window.playerModel.toJSON())){
                provider.signInAndFillData();
                provider.getIssues(roomName.replace(';)', '/'));
                setTimeout(function(){io.enterRoom(roomName)}, 1000);
            }


            window.roomView = (window.roomView) ? window.roomView : new RoomView({roomName: roomName});
            window.contributorView = (window.contributorView) ? window.contributorView : new ContributorView({collection: window.contributorsCollection});
            window.selectCardView = (window.selectCardView) ? window.selectCardView : new SelectCardView({collection: window.selectCardsCollection});
            window.cardView = (window.cardView) ? window.cardView : new CardView({collection: window.cardsCollection});
            window.chatView = (window.chatView) ? window.chatView : new ChatView({collection: window.chatCollection});
            window.taskView = (window.taskView) ? window.taskView : new TaskView({collection: window.tasksCollection});
        },
    });
    
    window.app_router = new Router();
    
    Backbone.history.start();
});
