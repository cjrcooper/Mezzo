class DecksController < ApplicationController

  def index
    @decks = Deck.all.reverse
    render :json => @decks
  end

  def create
    deck = Deck.new deck_params
    if deck.save
      current_user.decks << deck
      render :json => deck
    end
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
      deck = Deck.find params[:id]
    if note.save
      current_user.decks << deck
      render :json => deck
    end
  end

  private
  def deck_params
    params.permit(:name)
  end

end
