/*jshint globalstrict: true*/
define('views/create', [
  'text!templates/create.html',
  'models/game',
  'collections/contributors',
  'collections/tasks',
  'collections/selectCards',
  'backbone',
  'jquery',
  'socketIO',
  'underscore'
], function(createTemplate, GameModel, ContributorsCollection, TasksCollection, SelectCardsCollection, Backbone, $, io, _) {
  let Create = Backbone.View.extend({
    el: '.wrapper',
    events: {
      "click .enterRoomBtn" : "createRoom",
      "click .select__title" : "openRoomNameList",
      "click .select__item" : "chooseProject"
    },
    template: _.template(createTemplate),
    initialize: function(){
        _.bindAll(this, 'render');
        this.model.bind('change', this.render);
        this.render();
    },
    render: function(){
      try{
        $(this.el).html(this.template(this.model.toJSON()));
      }catch(e){
        console.log(e);
      }
    },
    createRoom: function(){
      window.gameModel = new GameModel();
      window.contributorsCollection = new ContributorsCollection();

      window.tasksCollection = new TasksCollection();

      window.selectCardsCollection = new SelectCardsCollection();
      window.selectCardsCollection.add([{'0': 0}, {'0.5' : 1}, {'1' : 2}, {'2' : 3}, {'3' : 4}, {'5' : 5}, {'8' : 6}, {'13' : 7}, {'20' : 8}, {'40' : 9}, {'100' : 10}, {'?' : 12}]);

      this.getProjectData();
      
      let roomName = $.trim($('.select__title').html()).replace('/', '');
      let roomUrl = '#room/' + roomName;

      window.app_router.navigate(roomUrl, {trigger: true});
    },
    openRoomNameList: function(){
      $('.select__items').show();
    },
    chooseProject: function(target){
      let choosenProject = $(target.target)
          .closest('.select__item')
          .find('.item__name')
          .html()
          .replace(/\s+/g, '');

      $('.select__title').html(choosenProject);
      $('.select__items').hide();
    },
    getProjectData: function(){
      let project = $.trim($('.select__title').html());
      let api = window.playerModel.toJSON().playerAPI;

      window.gameModel.set('nameOfProject', project);
      window.gameModel.set('player', window.playerModel.toJSON().player);

      window.provider.getIssues(api, project, window.tasksCollection);
      window.provider.getCollaborators(api, project, window.contributorsCollection);
    }
    // socketInit: function(){
      // let playerData = this.model.toJSON().player;
      // let gameData = window.player.toJSON();
      // let roomName = '/' + $('.roomNameInput').html();
      // console.log(playerData, gameData, roomName);
      // window.socket.emit('enter room', playerData, gameData);
      // window.socket = io(roomName);
      // window.socket.on('connectionReady', function(currency, table, gamersList){
      // 	console.log(currency);
      // 	console.log(table);
      // 	console.log(gamersList);
      // });
      // window.app_router.navigate('#go_to_room/:roomName', {trigger: true});
    // }
  });

  return Create;

});