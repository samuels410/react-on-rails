Rails.application.routes.draw do
  resources :followers do
    collection do
      get 'random'
    end
  end
  resources :tweets
  get 'profile' => 'profile#index'
  patch 'profile' => 'profile#update'
  devise_for :users
  root to: 'home#index'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
