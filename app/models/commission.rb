class Commission < ApplicationRecord
  belongs_to :seller, class_name: "User"

  enum :status, active: 0, expired: 1, pending_review: 2

  validates_presence_of :commission_percentage, :effective_from
  validates :commission_percentage, presence: true
  validates :commission_percentage, numericality: { greater_than: 0, less_than_or_equal_to: 100 }

  validates :status, presence: true
end
