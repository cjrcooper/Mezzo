class NoteController < ApplicationController

  def index
    @users = User.all
    @notes = current_user.notes.select("id, title, content, category").all
  end

end
