
var app = app || {};

$(document).ready(function() {

    app.router = new app.AppRouter();

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

});

$(document).ready(function(){
  $( ".note" ).draggable({containment: "#main-container"});
})
