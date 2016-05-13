var app = app || {};

app.AppRouter = Backbone.Router.extend({
    routes: {
        '': 'introduction',
        'decks': 'showdecks',
        'decks/:id': 'showdeck',
    },

    introduction: function() {

      app.decks = new app.Decks();

      app.notes = new app.Notes();
        app.appNoteView = new app.NoteView();
        app.Language.fetch().done(function(){
            app.notes.fetch().done( function(){
              app.decks.fetch().done(function(){
                app.notes.each(function (note) {
                  app.appNoteView.render();
                });
              });
          });
        })
    },

    showdecks: function(){
      app.decks = new app.Decks();
      app.appDeckView = new app.DeckView();

        app.decks.fetch().done(function(){
          app.appDeckView.render();
        })
    },

    showdeck: function(){
      app.words = new app.Words();
      app.appWordView = new app.WordView();
        app.words.fetch().done(function(){
          app.appWordView.render();
        })
    }

});
