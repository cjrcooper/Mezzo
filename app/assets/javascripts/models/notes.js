var app = app || {};

app.Note = Backbone.Model.extend({

  initialize: function(){
    this.on('change', function(){
      console.log('Test');
    })
  },

  defaults: {
    title: 'Test',
    something: 2
  },

  urlRoot: "/notes",

});
