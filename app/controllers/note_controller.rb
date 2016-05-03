class NoteController < ApplicationController

  def index
    @Users = User.all
    @Notes = current_user.notes.select("id, title, content, category").all
    render :json => @Notes
  end

end
