Rails.application.routes.draw do

  devise_for :users

  root to: "pages#home"
  get '/languages' => 'language#index'
  get '/notes/:id' => 'notes#destroy'
  resources :notes
  resources :words
  resources :decks

end
