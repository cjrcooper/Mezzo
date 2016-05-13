var app = app || {};

app.Words = Backbone.Collection.extend({
  url: '/words',
  model: app.Word
});
