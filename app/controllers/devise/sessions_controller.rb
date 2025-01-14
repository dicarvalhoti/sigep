# frozen_string_literal: true

class Devise::SessionsController < DeviseTokenAuth::SessionsController
  # Prevent session parameter from being passed
  # Unpermitted parameter: session
  wrap_parameters format: []

  def render_create_success
    render partial: "devise/auth", formats: [ :json ], locals: { resource: @resource }
  end


  private

  def login_page_url(error: nil)
    frontend_url = ENV.fetch("FRONTEND_URL", nil)

    "#{frontend_url}/app/login?error=#{error}"
  end
end
