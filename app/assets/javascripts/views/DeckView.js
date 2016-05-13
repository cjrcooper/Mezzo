var app = app || {};
var storedDeck;

app.DeckView = Backbone.View.extend({
  el: '#main',


  events: {
    'click .deck-title-container': 'showDeckDetails',
  },


  render: function() {

    var appDeckView = $('#appDeckViewTemplate').html();
    var appDeckViewTemplate = _.template(appDeckView);

    this.$el.html(appDeckViewTemplate);
    this.getDecks();
    this.makeNewDeck();
    this.deleteDeck();
    this.storeClickedDeck();
  },


  getDecks: function(){
    var decks = app.decks.models;
    var deckContainer = $('.new-deck-container');

    $.each(decks, function(){
        var deckName = '<div class="deck-title-container" id="note_' + this.get("id") +'" data-deckid="' + this.get("id") + '"><div class="deck-options-left">' + this.get("name") + '</div><div class="deck-options-right"><div class="deck-options-icons"><span class="fa fa-pencil deck-edit"></span><span class="fa fa-trash deck-delete"></span></div></div></div>';
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

  deleteDeck: function(){
  $('.deck-delete').on('click', function(){
      var x = window.confirm('are you sure?')
      if ( x ) {
        var $parentListItem = $(this).closest(".deck-title-container");
        var deckId = $parentListItem.data("deckid");
        $parentListItem.remove();
        app.decks.get( deckId ).destroy();
        app.decks.remove( deckId );
      }
    })
  },

  storeClickedDeck: function(){
    $('.deck-title-container').on('click', function(){
      storedDeck = $(this).data('deckid');
    })
  },


  showDeckDetails: function () {
      app.router.navigate('decks/' + storedDeck + '', true);
    },


});
