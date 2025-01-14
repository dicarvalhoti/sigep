class Api::V1::UsersController < Api::BaseController
  before_action :set_user, only: [ :show, :toggle_status ]
  def index
    @users = policy_scope(User.all.order("created_at ASC"))
    return unless params[:role].present?
    @users = @users.where(role: params[:role])
  end

  def me
    @user = current_user
  end

  def show;  end

  def create
    user = params.require(:user).permit(:name, :email, :role)
    if params[:create_password].present?
      user[:password] = params[:password]
      user[:password_confirmation] = params[:password_confirmation]
    end
    commission = user[:role].to_sym == :seller ? { commission_percentage: params[:commission_percentage],
      effective_from: params[:effective_from] } : nil
    result = CreateUserService.new(
        user: user,
        commission:,
     ).call


    if result.success?
      render :create, status: :ok, locals: { user: result.data }
    else
      render json: { errors: result.errors }, status: :unprocessable_entity
    end
  end


  def update
    user = params.require(:user).permit(:id, :name, :email, :role)
    if params[:password_changed].present?
      user[:password] = params[:password]
      user[:password_confirmation] = params[:password_confirmation]
    end
    commission = user[:role].to_sym == :seller ? { commission_percentage: params[:commission_percentage],
                  effective_from: params[:effective_from] } : nil
    result = UpdateUserService.new(
      user: user,
      commission:,
    ).call

    if result.success?
      render :update, status: :ok, locals: { user: result.data }
    else
      render json: { errors: result.errors }, status: :unprocessable_entity
    end
  end

  def validate_token
  end

  def toggle_status
    @user.active? ? @user.inactive! : @user.active!
    render :show
  end

  def destroy
    @user = User.find(params[:id])
    @user.destroy
    head :no_content
  end


  private

  def set_user
    @user = User.find(params[:id])
  end

  def user_params
    params.require(:user).permit(:id, :name, :email, :role)
  end

  # def all_params
  #   params.require().permit(:id, :name, :email, :role, :format, :user, :password, :password_confirmation)
  # end
end
