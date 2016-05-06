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
       title: '<p>' + 'Title ' + '<span class="note-title" contenteditable="true">' + this.title + '</span>' + '</p>',
       content: '<p>' + '<span class="note-content" contenteditable="true">' + this.content + '</span>' + '</p>',
       category: '<p>' + 'Category ' + '<span class="note-category" contenteditable="true">' + this.category + '</span>' + '</p>',
      }
      noteListElement.append('<li class="note"><div class="note-draggable-area"><span class="glyphicon glyphicon-align-justify pull-right"></span></div><div class="note-details">' + x.title + x.category + x.content +'</div><div class="note-options-area"></div></li>');
    })

    $( ".note" ).resizable({
      minHeight: 150,
      containment: "#main",
    });

    $( ".note-draggable-area" ).on("mousedown", function(){
      $(".note").parent().sortable({
        disabled: false,
        containment: '#main'
      });
    })

    $( ".note-draggable-area" ).on("mouseup", function(){
      $(".note").parent().sortable({
        disabled: true,
        containment: '#main'
      });
    })

    }

});
