class CustomerPolicy < ApplicationPolicy
  def index?
    @user.admin?
  end

  class Scope < ApplicationPolicy::Scope
    def initialize(user, scope)
      @user  = user
      @scope = scope
    end
    def resolve
      if user.admin?
        scope.all
      elsif user.seller?
        scope.where(seller_id: user.id).all
      end
    end
  end
end
