/*jshint globalstrict: true*/
define('views/start', [
  'text!templates/start.html',
  'io/main',
  'backbone',
  'underscore'
], function(startTemplate, io, Backbone, _) {
  let StartView = Backbone.View.extend({
    el: '.main-content',

    events: {
      "click .signIn" : "gotoCreatePage"
    },

    template : _.template(startTemplate),

    initialize: function(options){
      this.router = options.router;
      this.render();
    },

    render: function(){
      $(this.el).html(this.template());
    },

    gotoCreatePage: function(e){
      let providerName =  $(e.target).attr('data-login');
      localStorage.setItem('providerName', providerName);
      this.router.navigate('#create', {trigger: true});
    }
  });

  return StartView;

});