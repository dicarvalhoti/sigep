class ApplicationController < ActionController::Base
  include DeviseTokenAuth::Concerns::SetUserByToken
  include Pundit::Authorization
  include RequestExceptionHandler

  allow_browser versions: :modern

  skip_before_action :verify_authenticity_token
  around_action :handle_with_exception, unless: :devise_controller?


 protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_in, keys: [ :email, :password ])
    devise_parameter_sanitizer.permit(:sign_up, keys: [ :name, :email, :password, :password_confirmation ])
    devise_parameter_sanitizer.permit(:account_update, keys: [ :name, :email, :password, :password_confirmation, :current_password ])
  end
end
