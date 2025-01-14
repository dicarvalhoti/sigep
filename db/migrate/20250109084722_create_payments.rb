class CreatePayments < ActiveRecord::Migration[8.0]
  def change
    create_table :payments do |t|
      t.references :responsible_user, null: false, foreign_key: { to_table: :users }
      t.references :seller, null: false, foreign_key: { to_table: :users }
      t.references :customer, null: false, foreign_key: true
      t.integer :payment_method, null: false, default: 0
      t.integer :payment_gateway, null: false, default: 0
      t.decimal :total_sale_value, precision: 10, scale: 2, null: false
      t.decimal :commission_amount, precision: 10, scale: 2, null: true
      t.decimal :total_amount, precision: 10, scale: 2, null: false
      t.integer :status, null: false, default: 0



      t.timestamps
    end
  end
end
