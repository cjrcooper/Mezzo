var app = app || {};

// what if geolocation fails or they enter an address????

app.CustomerView = Backbone.View.extend({
  el: '#main',
  events: {
    'click #resetTypeButton': 'resetType',
  },

  render: function() {
      var test = $('<div></div>');
      this.append(test);
    }
});
