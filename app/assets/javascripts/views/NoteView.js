var app = app || {};

app.NoteView = Backbone.View.extend({
  el: '#main',
  render: function() {

    var appNoteView = $('#appNoteViewTemplate').html();
    var appNoteViewTemplate = _.template(appNoteView);

    this.$el.html(appNoteViewTemplate);

    this.populateNote();

  },




  populateNote: function(){

    var note = app.Note.attributes;
    var noteListElement = $('.notes-list');


    $.each(note, function(){
      var x = {
       title: '<div class="note-title-container"><span class="note-title">' + this.title + '</span></div>',
       content: '<div class="note-content-container"><span class="note-content">' + this.content + '</span></div>',
       category: '<div class="note-category-container">' + 'Category ' + '<span class="note-category">' + this.category + '</span>' + '</div>',
      }
      noteListElement.append('<li class="note"><div class="note-draggable-area"><span class="glyphicon glyphicon-align-justify pull-right"></span></div><div class="note-details">' + x.title + x.category + x.content +'</div></li>');
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

    var noteTranslate = '<span class="note-translate"></span>';
    var noteColor = '<span class="note-color fa fa-paint-brush"></span>';
    var noteDelete = '<span class="note-delete fa fa-trash"></span>';
    var noteEdit = '<span class="note-edit fa fa-pencil"></span>';

    $(".note").append('<div class="note-options-area">' + noteEdit + noteColor + noteDelete +'</div>');


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
      $(this).closest('.note').animate({opacity: 0}, 0.2)
      $("#note-overlay").css({"display": "block"})
      var x = $(this).closest('.note').clone().addClass('noteOverlay');
      x.prependTo("body");
      $(this).closest('.note').addClass('current-note');
      $('.noteOverlay').children('.note-details').children().each(function(){
        $(this).attr('contenteditable', 'true');
      });
    });

    $("#note-overlay").on("click", function(e){
      var target = $(e.target);
      if (target.is("#note-overlay")) {
        $("#note-overlay").css({"display": "none"})
        var newNotesInfo = $('.noteOverlay').children('.note-details').html();
        $('.current-note').children('.note-details').html(newNotesInfo);
        $('.noteOverlay').remove();
        $(".note").animate({opacity: 1}, 0.5);
      }
    });
  }
});
