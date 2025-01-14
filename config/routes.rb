Rails.application.routes.draw do
  resources :customers
  mount_devise_token_auth_for "User", at: "auth", controllers: {
    passwords: "devise/passwords",
    sessions: "devise/sessions",
    token_validations: "devise/token_validations"
  }, via: [ :get, :post ]


  resources :recipes
  get "/auth/*params", to: "dashboard#login"
  get "/app/*params", to: "dashboard#index"

  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Render dynamic PWA files from app/views/pwa/* (remember to link manifest in application.html.erb)
  # get "manifest" => "rails/pwa#manifest", as: :pwa_manifest
  # get "service-worker" => "rails/pwa#service_worker", as: :pwa_service_worker

  # Defines the root path route ("/")
  # root "posts#index"
  root "dashboard#index"

  namespace :api, defaults: { format: "json" } do
    namespace :v1 do
      resources :users do
        get "me", to: "users#me", on: :collection
        patch :toggle_status, on: :member
      end
      resources :payments, only: %i[index show create destroy] do
        get :customers, on: :collection
      end
      resources :customers
    end
  end
end
