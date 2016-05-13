var app = app || {};

app.WordView = Backbone.View.extend({
  el: '#main',

  render: function() {

    var appWordView = $('#appWordViewTemplate').html();
    var appWordViewTemplate = _.template(appWordView);

    this.$el.html(appWordViewTemplate);
    this.getWords();
    this.flipWords();
    this.sliderSize();
    this.rightWords();
    this.leftWords();
  },

  getWords: function(){
    words = app.words.models;
    var flashCardContainer = $('.word-list-container');
    $.each(words, function(){
      if (this.get('deck_id') === storedDeck){
        var cardName = '<div class="words-list"><div class="flash-card-main-container"><div class="flash-card"><div class="first-card">' + this.get('second_content') + '</div><div class="second-card">' + this.get('first_content')+ '</div></div></div></div>';
          flashCardContainer.append(cardName);
      }
    });
  },

  flipWords: function(){
    $('.flash-card-main-container').on('click', function(){
      $('.flash-card').toggleClass('flipped');
    })
  },


  sliderSize: function(){
    var mainSize = $('#main').width();
    var multiplyingSize = $('.new-word-container').width() * 2;
    var deckLength = $('.words-list').length
    $('.words-list').css({"width": mainSize});
    var containerSize = $('.word-list-container').css({'width': (mainSize * deckLength) + "px"})
  },


  rightWords: function(){
    $('#right-arrow').on('click', function(){

      var totalSum = $('.words-list').length * $('.new-word-container').width();
      var addedMargin = $('.words-list').width() * 2 + 'px';
      var firstElementMargin = parseInt($('.words-list').first().width());
      var firstElementCurrentMargin = parseInt($('.words-list').first().css('margin-left'));
      if(firstElementCurrentMargin < totalSum){
        var x = firstElementCurrentMargin - (firstElementMargin * 2);
        $('.words-list').first().animate({'margin-left': x});
      }
    });
  },

  leftWords: function(){
    $('#left-arrow').on('click', function(){

      var totalSum = $('.words-list').length * $('.new-word-container').width();
      var addedMargin = $('.words-list').width() * 2 + 'px';
      var firstElementMargin = parseInt($('.words-list').first().width());
      var firstElementCurrentMargin = parseInt($('.words-list').first().css('margin-left'));
        if(firstElementCurrentMargin < totalSum){
          var x = firstElementCurrentMargin + (firstElementMargin * 2);
            $('.words-list').first().animate({'margin-left': x});
        }
    });
  }


});
