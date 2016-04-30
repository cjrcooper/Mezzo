Rails.application.routes.draw do

  devise_for :users
  root to: "welcome#index"

  get '/notes' => 'note#index'

end
