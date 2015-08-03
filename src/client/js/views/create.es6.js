/*jshint globalstrict: true*/
define('views/create', [
  'data/service',
  'text!templates/create.html',
  'backbone',
  'jquery',
  'underscore'
], function(appData, createTemplate, Backbone, $, _) {
  let Create = Backbone.View.extend({
    el: '.main-content',
    
    events: {
      "click .enterRoomBtn" : "createRoom",
      "click .select__title" : "openRoomNameList",
      "click .select__item" : "chooseProject"
    },
    
    template: _.template(createTemplate),
    
    initialize: function(options){
        this.router = options.router;

        _.bindAll(this, 'render');
        this.model.bind('change', this.render);
    },
    
    render: function(){
        $(this.el).html(this.template(this.model.toJSON()));
    },
    
    createRoom: function(){
      let roomName = $.trim($('.select__title').html()).replace('/', ';)');
      let roomUrl = '#room/' + roomName;

      let fullRoomName = $.trim($('.select__title').html());
      let slashIndex = fullRoomName.indexOf('/');

      let roomLabel = fullRoomName.substring(slashIndex + 1);
      let roomOwner = fullRoomName.substring(0, slashIndex);

      let projectsList = appData.projectsModel.get('listOfProjects');
      let currentProject = _.findWhere(projectsList, {name: roomLabel, owner: roomOwner});
      let projectUrl = currentProject.url;

      appData.headerModel.set('projectName', roomName.replace(';)', '/'));
      appData.headerModel.set('projectUrl', projectUrl);

      appData.headerModel.set('currencyType', $('input:checked').attr('data'));
 
      this.router.navigate(roomUrl, {trigger: true});
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

    }
  });

  return Create;

});