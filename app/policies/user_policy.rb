class UserPolicy < ApplicationPolicy
  def index?
    true
  end

  def update?
    @user.admin? || @user.id == @record.id
  end

  def create?
    @user.admin?
  end

  def toggle_status?
    @user.admin?
  end

  def destroy?
    @user.admin?
  end


  class Scope < Scope
    def resolve
      if user.admin?
        scope.all
      elsif user.seller?
        scope.where(id: user.id).all
      end
    end
  end
end
