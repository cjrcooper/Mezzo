var app = app || {};

app.AppRouter = Backbone.Router.extend({
    routes: {
        '': 'introduction',
    },

    introduction: function() {

        app.appNoteView = new app.NoteView();
        app.Language.fetch().done(function(){
            app.notes.fetch().done( function(){
              app.appNoteView.render();
          });
        })
    },

});
