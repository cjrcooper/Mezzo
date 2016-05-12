var app = app || {};
var highlightedText;
var selectedNoteId;

app.NoteView = Backbone.View.extend({
  el: '#main',
  render: function() {

    var appNoteView = $('#appNoteViewTemplate').html();
    var appNoteViewTemplate = _.template(appNoteView);

    this.$el.html(appNoteViewTemplate);

    this.populateNote();
    this.newNote();
    this.deleteNote();

  },


  newNote: function(){
  $('#new-note').on('click', function(){
      var makeNote = new app.Note
      makeNote.save().done(function () {
        app.notes.fetch().done(function () {
          app.appNoteView.render();
        });
      });
    })
  },

  deleteNote: function(){
  $('.note-delete').on('click', function(){
      var x = window.confirm('are you sure?')
      var y = parseInt($(this).closest('.note').attr('id'));
      if( x === true ){
        $.each(app.notes.attributes, function(){
          if (y === this.id){
            console.log(this.id)
          }
        })
      }
    })
  },



  populateNote: function(){

    var note = app.notes.attributes;
    var language = app.Language.attributes;
    var noteListElement = $('.notes-list');


    $.each(note, function(){
      var x = {
       title: '<div class="note-title-container">' + this.title + '</div>',
       content: '<div class="note-content-container">' + this.content + '</div>',
       category: '<div class="note-category-container">' + this.category + '</div>',
      }
      noteListElement.append('<li class="note" data-note-source-lang="'+ this.current_language +'" data-note-target-lang="' + this.target_language + '" id="' + this.id + '"><div class="note-draggable-area"><span class="glyphicon glyphicon-align-justify pull-right"></span></div><div class="note-details">' + x.title + x.category + x.content +'</div></li>');


      if(this.title === null){
        $('.note-title-container').empty();
      }
      if(this.category === null){
        $('.note-category-container').empty();
      }
      if(this.content === null){
        $('.note-content-container').empty();
      }
    })


    $( ".note" ).resizable({
      minHeight: 150,
      containment: "#main",
      resize: function(){
        setbottomMenuOptions();
      }
    });


    // Added in an event to bind the options nav to the bottom of the note and keep it there during
    // resizing....wow this took a while to work out...



    var noteCurrentLanguage = '<select class="note-current-language"></select>';
    var noteTargetLanguage = '<select class="note-target-language"></select>';
    var noteTranslate = '<span class="note-translate fa fa-language"></span>';
    var noteColor = '<span class="note-color fa fa-paint-brush"></span>';
    var noteDelete = '<span class="note-delete fa fa-trash"></span>';
    var noteEdit = '<span class="note-edit fa fa-pencil"></span>';

    var colorOne = '<div class="colorOne"></div>';
    var colorTwo = '<div class="colorTwo"></div>';
    var colorThree = '<div class="colorThree"></div>';
    var colorFour = '<div class="colorFour"></div>';
    var colorFive = '<div class="colorFive"></div>';
    var colorSix = '<div class="colorSix"></div>';
    var returnOptions = '<div class="returnOptions"><span class="glyphicon glyphicon-arrow-down"></span></div>'


    $(".note").append('<div class="note-options-area"><div class="note-edit-options">' + noteEdit + noteColor + noteDelete +'</div><div class="note-color-options">' + returnOptions + colorOne + colorTwo + colorThree + colorFour + colorFive + colorSix +'</div></div>');


    var setbottomMenuOptions = function(){
      $(".note-options-area").each(function(){
        var noteHeightMargin = parseInt($(this).closest('.note').css("height"));
        var noteMessageHeightMargin = parseInt($(this).parent().children('.note-details').css("height"));
        $(this).css("marginTop", (noteHeightMargin - 25 - noteMessageHeightMargin - 25) + 'px');
      });
    };
    setbottomMenuOptions();

    $('.note-content, .note-title-container, .note-category-container, .note-content-container').on('keydown', function(){
      setbottomMenuthisOptions();
    });

    //Bind Draggable area
    $( ".note-draggable-area" ).on("mousedown", function(){
      $(".note").parent().sortable({
        disabled: false,
        containment: '#main'
      });
    })
    //Unbind Draggable area
    $( ".note-draggable-area" ).on("mouseup", function(){
      $(".note").parent().sortable({
        disabled: true,
        containment: '#main'
      });
    });


    $(".note-edit").on("click", function(){
      //fade out current note
      $(this).closest('.note').animate({opacity: 0}, 0.2)
      selectedNoteId = $(this).closest('.note').attr('id');

      // Display the overlay and clone the note and add it to the body
    $("#note-overlay").css({"display": "block"})
      var x = $(this).closest('.note').clone().addClass('noteOverlay');
      x.prependTo("body");

      x.resizable({ disabled: true});

      $(this).closest('.note').addClass('current-note');
      $('.noteOverlay').children('.note-details').children().each(function(){
        $(this).attr('contenteditable', 'true');
      });
      $('.noteOverlay').children('.note-options-area').addClass('large-note-details');

      var translateOption = $('.large-note-details').children('.note-edit-options')

      $(noteTranslate).prependTo(translateOption);
      $('.noteOverlay').find('.note-color-options').css({'display': 'none'});

      $('<div class="language-selection-options">' + noteCurrentLanguage + noteTargetLanguage + '</div>').appendTo('.large-note-details');

      var languageList = $.each(language, function(){
        var x = this.abbreviation;
        var y = this.name;
        $('<option data-language-abbr="' + x + '">' + y + '</option>').appendTo('.note-current-language, .note-target-language');
      });


      var selectedNoteCurrentLang = $(this).closest('.note').data('note-source-lang');
      var selectedNoteTargetLang = $(this).closest('.note').data('note-target-lang');
      var s = $('.note-current-language option[data-language-abbr="' + selectedNoteCurrentLang + '"]').attr('selected', 'selected');
      var q = $('.note-target-language option[data-language-abbr="' + selectedNoteTargetLang + '"]').attr('selected', 'selected');



      $('.noteOverlay').find('.note-title-container, .note-content-container, .note-category-container').on('focusout', function(){
        if( $('.noteOverlay').find('.note-content-container').is(':empty') ){
          return;
        } else {
          var selectedText = window.getSelection().toString()
          $('.highlight').contents().unwrap();
          var spn = '<span class="highlight">' + selectedText + '</span>';

          var text = $('.noteOverlay').find('.note-content-container').text();
            $('.noteOverlay').find('.note-content-container').html(text.replace(selectedText, spn));
          var encodedText = encodeURI(selectedText)
          highlightedText = encodedText;
        }
      });

      $('.note-translate').on('click', function(){
        var currentLan = $('.note-current-language option:selected').data('language-abbr');
        var targetLan = $('.note-target-language option:selected').data('language-abbr');

        var translatedMessage = $.get('https://www.googleapis.com/language/translate/v2?key=AIzaSyAWxlzAAXIz59VqFH5pElpmEzwuPJF0ZTw&prettyprint&source=' + currentLan +'&target=' + targetLan + '&q=' + highlightedText).done(function(){

          var text = translatedMessage.responseText;
          var textnew = JSON.parse(text)
          var translatedText = textnew.data.translations[0].translatedText;
          var t = $.find('.highlight');
          $(t[0]).html(translatedText);
        });
      });
    });









    $("#note-overlay").on("click", function(e){
      var target = $(e.target);
      if (target.is("#note-overlay")) {
        $("#note-overlay").css({"display": "none"})
        var newNotesInfo = $('.noteOverlay').children('.note-details').html();
        $('.note-translate').remove()
        $('.current-note').children('.note-details').html(newNotesInfo);
        $('.noteOverlay').remove();
        $(".note").animate({opacity: 1}, 0.5);


        $('selectedNoteId')


        setbottomMenuOptions();
      }
    });




    $(".note-color").on('click', function(){
      $(this).parent('.note-edit-options').animate({ opacity: 0 });
      $(this).closest('.note-options-area').children('.note-color-options').addClass('note-color-options-shift');
    })

    $(".returnOptions").on('click', function(){
      $('.note-color-options-shift').removeClass('note-color-options-shift');
      $('.note-edit-options').animate({ opacity: 1 });
    });

    $('.colorOne, .colorTwo, .colorThree, .colorFour, .colorFive, .colorSix').on('click', function(){
      var selectedColor = $(this).css('background-color');

      $(this).closest('.note').css({'background-color': selectedColor});
      $(this).closest('.note').children('.note-draggable-area').css({'background-color': selectedColor});

    })


  }
});
