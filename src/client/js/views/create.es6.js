/*jshint globalstrict: true*/
define('views/create', [
  'text!templates/create.html',
  'backbone',
  'jquery',
  'underscore'
], function(createTemplate, Backbone, $, _) {
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