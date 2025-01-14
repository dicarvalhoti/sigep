class Devise::TokenValidationsController < DeviseTokenAuth::TokenValidationsController
  before_action :authenticate_user!

  def validate_token
    if current_user
      render json: {
        success: true,
        data: resource_data(resource_json: @resource.as_json)
      }
    else
      render json: {
        success: false,
        errors: ['Token inválido ou expirado']
      }, status: 401
    end
  end
end
  