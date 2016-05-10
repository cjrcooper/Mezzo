var app = app || {};

app.AppRouter = Backbone.Router.extend({
    routes: {
        '': 'introduction',
    },

    introduction: function() {
        var appNoteView = new app.NoteView();
        app.Language.fetch().done(function(){
            app.Note.fetch().done( function(){
              appNoteView.render();
          });
        })
    },

});
