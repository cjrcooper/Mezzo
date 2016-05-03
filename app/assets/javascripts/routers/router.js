var app = app || {};

app.AppRouter = Backbone.Router.extend({
    routes: {
        '': 'introduction',
    },

    introduction: function() {
        var appView = new app.AppView();
        appView.render();
    },

});
