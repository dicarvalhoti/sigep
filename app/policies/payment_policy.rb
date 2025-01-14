class PaymentPolicy  < ApplicationPolicy
  def index?
    true
  end

  def create?
    @user.admin? || (@user.seller? && @record.seller_id == @user.id)
  end

  def destroy?
    @user.admin?
  end

  def customers?
    true
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
