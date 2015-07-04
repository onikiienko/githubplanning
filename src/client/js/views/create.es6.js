/*jshint globalstrict: true*/
define('views/create', [
  'text!templates/create.html',
  'collections/contributors',
  'collections/tasks',
  'collections/selectCards',
  'io/main',
  'backbone',
  'jquery',
  'underscore'
], function(createTemplate, ContributorsCollection, TasksCollection, SelectCardsCollection, io, Backbone, $, _) {
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
      window.contributorsCollection = new ContributorsCollection();

      window.tasksCollection = new TasksCollection();

      window.selectCardsCollection = new SelectCardsCollection();
      window.selectCardsCollection.add([{'0': 0}, {'0.5' : 1}, {'1' : 2}, {'2' : 3}, {'3' : 4}, {'5' : 5}, {'8' : 6}, {'13' : 7}, {'20' : 8}, {'40' : 9}, {'100' : 10}, {'?' : 12}]);

      this.getProjectData();
      
      let roomName = $.trim($('.select__title').html()).replace('/', '');
      let roomUrl = '#room/' + roomName;
      io.enterRoom(roomName);

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

      window.provider.getIssues(api, project, window.tasksCollection);
      window.provider.getCollaborators(api, project, window.contributorsCollection);
    }
  });

  return Create;

});