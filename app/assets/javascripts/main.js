
var app = app || {};

$(document).ready(function() {

    app.router = new app.AppRouter();

    app.note = new app.Note();
    app.deck = new app.Deck();
    app.word = new app.Word();
    app.Language = new app.Language();

    Backbone.history.start();

  });


$('#Decks').on('click', function(){

})


// Slide out menu
$(document).ready(function(){

  $('#hamburger-menu-slider').on('click', function(){
      $('#side-nav').animate({left: "+=300"});
      $('#overlay').css('display', 'block');
    });

  $('#overlay, #close').on('click', function(){
    $('#side-nav').animate({left: "-=300"});
    setTimeout(function(){
      $('#overlay').css('display', 'none');
    }, 450)
  })

  var navHeight = $("nav").css("height");
  $('#main-container').css({
    paddingTop: navHeight
  });


  $( window ).resize(function() {
    var navHeight = $("nav").css("height");

    $('#main-container').css({
      paddingTop: navHeight
    });
  });

});
