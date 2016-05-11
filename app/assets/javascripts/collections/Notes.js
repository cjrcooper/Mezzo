var app = app || {};

app.Notes = Backbone.Collection.extend({
  url: '/notes',
  model: app.Notes
});
