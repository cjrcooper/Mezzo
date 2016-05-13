class WordsController < ApplicationController

  def index
    @words = Word.all
    render :json => @words
  end

  def create
  end

  def show

  end

  def edit

  end


  def destroy
    @notes = current_user.notes.select("id, title, content, category, current_language, target_language").all.order("id DESC")
    note = Note.find params[:id]
    note.destroy
    render :json => @notes
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
