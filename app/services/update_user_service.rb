class UpdateUserService
  def initialize(user:, commission: nil)
    @user_params = user
    @commission = commission
  end

  def call
    ActiveRecord::Base.transaction do
      update_user
      handle_role_change
    end
      ResultService.new(success: true, data: @user)
    rescue ActiveRecord::RecordInvalid => e
      ResultService.new(success: false, data: @user, errors: e.record.errors.full_messages)
  end

  private

  def update_user
    @user = User.find(@user_params[:id])
    @user.update!(@user_params)
  end

  def handle_role_change
    if @user.admin? and @user.default_commission.present?
      disable_commissions
    elsif @user.seller?
      enable_or_create_commission
    end
  end

  def disable_commissions
    @user.default_commission.expired!
  end

  def enable_or_create_commission
    if @user.default_commission.present?
      return unless @user.default_commission.commission_percentage != @commission[:commission_percentage]
      @user.default_commission.update_attribute(:commission_percentage, @commission[:commission_percentage])
    else
      @user.commissions.create!(@commission)
    end
  end
end
