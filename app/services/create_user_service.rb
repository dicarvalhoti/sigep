class CreateUserService
  def initialize(user:, commission: nil)
    @user_params = user
    @commission = commission

    # TODO Usuário deve mudar a senha no próximo Login
    if !@user_params[:password].present?
      @user_params[:password] = "123mudar"
      @user_params[:password_confirmation] = "123mudar"
    end
  end

  def call
    ActiveRecord::Base.transaction do
      create_user
    end
      ResultService.new(success: true, data: @user)
    rescue ActiveRecord::RecordInvalid => e
      puts "O ERRO TODO: #{e.record.errors}"
      ResultService.new(success: false, data: e.record, errors: e.record.errors)
  end

  private

  def create_user
    @user = User.create!(@user_params)
    @user.skip_confirmation!
    @user.skip_confirmation_notification!
    @user.save!
    if @user.persisted?
      handle_role
    end
  end

  def handle_role
    if @user.seller?
      create_commission
    end
  end

  def create_commission
    @user.commissions.create!(@commission)
  end
end
