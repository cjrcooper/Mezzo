class DecksController < ApplicationController

  def index
    @users = User.all
    @decks = current_user.decks.all.reverse
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
    @decks = current_user.decks
    deck = Deck.find params[:id]
    deck.destroy
    render :json => @decks
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
