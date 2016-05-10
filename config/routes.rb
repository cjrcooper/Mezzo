Rails.application.routes.draw do

  devise_for :users

  root to: "pages#home"
  get '/notes' => 'note#index'
  get '/languages' => 'language#index'

end
