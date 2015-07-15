/*jshint globalstrict: true*/
define('views/create', [
  'text!templates/create.html',
  'io/main',
  'backbone',
  'jquery',
  'underscore'
], function(createTemplate, io, Backbone, $, _) {
  let Create = Backbone.View.extend({
    el: '.main-content',
    events: {
      "click .enterRoomBtn" : "createRoom",
      "click .select__title" : "openRoomNameList",
      "click .select__item" : "chooseProject"
    },
    template: _.template(createTemplate),
    initialize: function(options){
        _.bindAll(this, 'render');
        this.model.bind('change', this.render);
        this.provider = options.provider;
        this.render();
    },
    render: function(){
      try{
        $(this.el).html(this.template(this.model.toJSON()));
      }catch(e){}
    },
    createRoom: function(){
      this.getProjectData();
      
      let roomName = $.trim($('.select__title').html()).replace('/', ';)');
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

      this.provider.getIssues(project);
    }
  });

  return Create;

});