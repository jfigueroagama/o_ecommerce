Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root to: "products#index"

  resources :products do
    resources :comments, only: [:create]
  end

  get 'users/new', to: "users#new", as: "new_user"
  get '/signup', to: "users#new"
  get '/signin', to: "sessions#new"
  post '/signin', to: "sessions#create"
  delete '/signout', to: "sessions#destroy", as: "session"

  resources :users, only: [:create]

  # The get reqquest to the index action
  #get "/products", to: "products#index"
  # The get request for the new action using an alias 'new_product'
  #get "/products/new", to: "products#new", as: "new_product"
  # The get request will be handled by the products controller show action
  #get "/products/:id", to: "products#show", as: "product"
  # The create request
  #post "/products", to: "products#create"
  # The edit request using an alias 'edit_product'
  #get "/products/:id/edit", to: "products#edit", as: "edit_product" 
  # The update request
  #patch "/products/:id", to: "products#update"
  # The destroy request
  #delete "/products/:id", to: "products#destroy"
  
end
