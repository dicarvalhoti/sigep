class User < ApplicationRecord
  include DeviseTokenAuth::Concerns::User
  include Devise::JWT::RevocationStrategies::Denylist
  include PgSearch::Model

  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, # , :validatable
         :jwt_authenticatable, jwt_revocation_strategy: JwtDenylist

  has_many :generated_payments, class_name: "Payment", foreign_key: "responsible_user_id"
  has_many :received_payments, class_name: "Payment", foreign_key: "seller_id"
  has_many :commissions, foreign_key: :seller_id, dependent: :destroy

  validates_presence_of :name


  enum :role, admin: 0, seller: 1
  enum :status, active: 0, inactive: 1

  pg_search_scope :search,
                  against: %i[name email],
                  using: { tsearch: { prefix: true } }


  def default_commission
    self.commissions.active.first
  end

  def self.from_email(email)
    find_by(email: email&.downcase)
  end
end
