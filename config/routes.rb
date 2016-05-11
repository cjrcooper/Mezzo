Rails.application.routes.draw do

  devise_for :users

  root to: "pages#home"
  get '/languages' => 'language#index'
  resources :notes

end
