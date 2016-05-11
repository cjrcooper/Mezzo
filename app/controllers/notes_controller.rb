class NotesController < ApplicationController

  def index
    @users = User.all
    @notes = current_user.notes.select("id, title, content, category, current_language, target_language").all.order("id DESC")
    render :json => @notes
  end

  def create
    note = Note.new note_params
    if note.save
      current_user.notes << note
      render :json => note
    end
  end

  def show

  end

  def edit

  end
  def update
      note = Note.find params[:id]
    if note.save
      current_user.notes << note
      render :json => note
    end
  end

  private
  def note_params
    params.permit(:title, :content, :category, :current_language, :target_language)
  end

end
