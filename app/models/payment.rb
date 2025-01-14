class Payment < ApplicationRecord
  include PgSearch::Model

  belongs_to :responsible_user, class_name: "User"
  belongs_to :seller, class_name: "User"
  belongs_to :customer

  enum :status, pending: 0, paid: 1, failed: 2, refunded: 3
  enum :payment_gateway, mercado_pago: 0, pag_seguro: 1
  enum :payment_method, credit_card: 0, debit_card: 1, bank_slip: 2

  validates :total_sale_value, :total_amount, presence: true
  validates :status, presence: true

  def customer_name
    customer.name
  end

  def customer_email
    customer_email
  end

  pg_search_scope :search_all, associated_against: {
    seller: [:name, :email],
    customer: [:name,:email]
  },using: { tsearch: { prefix: true } }

  
  pg_search_scope :search,
    against: %i[payment_gateway customer_name customer_email],
      using: { tsearch: { prefix: true } }
end
