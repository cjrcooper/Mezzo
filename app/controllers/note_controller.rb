class NoteController < ApplicationController

  def index
    @notes = current_user.notes.all
    render :json => @notes
  end

end
