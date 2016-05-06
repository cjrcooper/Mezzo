
var app = app || {};

app.AppView = Backbone.View.extend({

  el: '#main',

  events: {
  },

  render: function() {


      var appViewTemplate = $('#appViewTemplate').html();
      this.$el.html(appViewTemplate);
    }



});
