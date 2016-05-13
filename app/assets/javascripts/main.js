var app = app || {};


$(document).ready(function() {

    app.router = new app.AppRouter();

    app.note = new app.Note();
    app.deck = new app.Deck();
    app.word = new app.Word();
    app.Language = new app.Language();

    Backbone.history.start();

  });


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

  var sideNavHeight = parseInt($('#side-nav').css('height'));
  var sideNavContent = parseInt($('.side-menu-list').css('height'));
  var sideNavFooterHeight = parseInt($('#side-nav-footer').css('height'));
  var sideNavFinalHeight = (sideNavHeight - sideNavContent) - (sideNavFooterHeight - sideNavContent);
  var sideNavFooter = $('#side-nav-footer').css({'marginTop': sideNavFinalHeight +'px'});

  


  $('#Decks').on('click', function(){
      window.location = "#decks"
  })

  $('#Notes').on('click', function(){
      window.location = "#"
  })


});
