/*jshint globalstrict: true*/
define('views/createOrJoinView', [
  'text!templates/createOrJoinTemplate.html',
  'models/game',
  'backbone',
  'jquery',
  'socketIO',
  'underscore'
], function(createOrJoinTemplate, Game, Backbone, $, io, _) {
  let CreateOrJoinView = Backbone.View.extend({
    el: '.wrapper',
    events: {
      "click .enterRoomBtn" : "createRoom",
      "click .select__title" : "openRoomNameList",
      "click .select__item" : "chooseProject"
    },
    template: _.template(createOrJoinTemplate),
    initialize: function(){
        _.bindAll(this, 'render');
        this.model.bind('change', this.render);
    },
    render: function(){
      try{
        $(this.el).html(this.template(this.model.toJSON()));
      }catch(e){
        console.log(e);
      }
    },
    createRoom: function(){
      window.game = new Game();
      this.getProjectData();
      let roomName = $.trim($('.select__title').html()).replace('/', '');
      let roomUrl = '#room/' + roomName;
      window.app_router.navigate(roomUrl, {trigger: true});
    },
    openRoomNameList: function(){
      $('.select__items').show();
    },
    chooseProject: function(target){
      //pick project and write in input
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
      let api = window.player.toJSON().playerAPI;

      window.game.set('nameOfProject', project);
      window.game.set('player', window.player.toJSON().player);
      //get issues of a project
      window.provider.getIssues(api, project, window.game);
      window.provider.getCollaborators(api, project, window.game);
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
  return CreateOrJoinView;
});