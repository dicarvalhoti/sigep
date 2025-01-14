class PaymentService
  def initialize(user:, customer:, payment:, current_user:)
    @user = user
    @customer = Customer.find_or_create_by(customer)
    @payment = Payment.new(payment)
    @current_user = current_user
  end

  def call
    ActiveRecord::Base.transaction do
      make_payment
    end

    ResultService.new(success: true, data: @payment)
  rescue ActiveRecord::RecordInvalid => e
    ResultService.new(success: false, data: payment, errors: e.record.errors.full_messages)
  end

  private



  def make_payment(status: :paid)
    @payment.responsible_user = @current_user
    @payment.seller = @user
    @payment.customer = @customer
    @payment.status = status
    calculate_commission()
    calculate_amount()
    @payment.save!
  end

  def calculate_commission
    commission = @user.default_commission
    return 0 unless commission

    @payment.commission_amount = (@payment.total_sale_value * (commission.commission_percentage / 100.0))
  end

  def calculate_amount
    @payment.total_amount = @payment.total_sale_value - @payment.commission_amount
  end
end
