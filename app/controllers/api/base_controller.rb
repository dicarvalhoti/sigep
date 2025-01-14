class Api::BaseController < ApplicationController
    respond_to :json
    before_action :authenticate_user!
    before_action :check_authorization

    private

    def authenticate_by_access_token?
      request.headers[:api_access_token].present? || request.headers[:HTTP_API_ACCESS_TOKEN].present?
    end

    def check_authorization(model = nil)
      model ||= controller_name.classify.constantize

      authorize(model)
    end

    def check_admin_authorization?
      raise Pundit::NotAuthorizedError unless current_user.administrator?
    end
end
