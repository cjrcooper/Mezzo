var app = app || {};

app.DeckView = Backbone.View.extend({
  el: '#main',
  render: function() {

    var appDeckView = $('#appDeckViewTemplate').html();
    var appDeckViewTemplate = _.template(appDeckView);

    this.$el.html(appDeckViewTemplate);
    this.getDecks();
    this.makeNewDeck();
  },


  getDecks: function(){
    var decks = app.decks.models;
    var deckContainer = $('.new-deck-container');

    $.each(decks, function(){
        var deckName = '<div class="deck-title-container" id="note_' + this.get("id") +'"><div class="deck-options-left">' + this.get("name") + '</div><div class="deck-options-right"><div class="deck-options-icons"><span class="fa fa-pencil deck-edit"></span><span class="fa fa-trash deck-delete"></span></div></div></div>';
        deckContainer.append(deckName);
    });
  },


  makeNewDeck: function(){
    $('#new-deck').on('click', function(){

      var deckName = prompt("Name your deck");
      if (deckName != null) {
        var makeDeck = new app.Deck({"name": deckName})
        makeDeck.save().done(function () {
          app.decks.fetch().done(function () {
            app.appDeckView.render();
          });
        });
      }
    })
  },

  deleteNote: function(){
  $('.note-delete').on('click', function(){
      var x = window.confirm('are you sure?')
      if ( x ) {
        var $parentListItem = $(this).closest("li");
        var postId = $parentListItem.data("postid");
        $parentListItem.remove();
        app.notes.get( postId ).destroy();
        app.notes.remove( postId );
      }
    })
  },



});
