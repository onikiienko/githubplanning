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
      "click .select__item" : "chooseProject",
      "click" : "handleRoomList"
    },

    template: _.template(createTemplate),

    initialize: function(options){
        this.router = options.router;

        _.bindAll(this, 'render');
        this.model.bind('change', this.render);
        //handle esc key
        _.bindAll(this, 'closeRoomNameList');
        $(document).on('keydown', this.closeRoomNameList);
    },

    render: function(){
        $(this.el).html(this.template(this.model.toJSON()));
    },

    handleRoomList: function (e) {
        if ( $(e.target).attr("class") !== "select__title" ) {
            $('.select__items').hide();
            return;
          }

          $('.select__items').toggle();
    },

    createRoom: function(){
      let roomName = $.trim($('.select__title').html());
      let roomUrl = '#room/' + roomName.replace('/', ';)');
      let slashIndex = roomName.indexOf('/');
      let roomLabel = roomName.substring(slashIndex + 1);
      let roomOwner = roomName.substring(0, slashIndex);

      let projectsList = appData.projectsModel.get('listOfProjects');
      let currentProject = _.findWhere(projectsList, {name: roomLabel, owner: roomOwner});
      let projectUrl = currentProject.url;

      appData.headerModel.set('projectName', roomName);
      appData.headerModel.set('projectUrl', projectUrl);
      appData.headerModel.set('currencyType', $('input:checked').attr('data'));

      this.router.navigate(roomUrl, {trigger: true});
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

    closeRoomNameList: function(e) {
      if (e.which === 27) {
        $('.select__items').hide();
      }
    },
  });

  return Create;

});
