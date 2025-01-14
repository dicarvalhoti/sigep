class Api::V1::PaymentsController < Api::BaseController
  def index
    @payments = policy_scope(Payment.all)
    if params[:query].present?
      @payments = @payments.search_all(params[:query])
    end
  end

  def create
    user = User.find(params[:id])
    result = PaymentService.new(user: user, customer: customer_params, payment: payment_params, current_user: current_user).call

    if result.success?
      render json: result.data, status: :created
    else
      render json: result.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @payment = Payment.find(params[:id])
    @payment.destroy
    head :no_content
  end

  def costumers
    @customers = Customer.all
  end


  private

  def payment_params
    params.require(:payment).permit(:payment_gateway, :payment_method, :total_sale_value, :commission_percentage, :status)
  end

  def user_params
    params.require(:user).permit(:id)
  end

  def customer_params
    params.require(:customer).permit(:name, :email, :phone_number)
  end
end
