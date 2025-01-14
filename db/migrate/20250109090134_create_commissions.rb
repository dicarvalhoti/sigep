class CreateCommissions < ActiveRecord::Migration[8.0]
  def change
    create_table :commissions do |t|
      t.references :seller, null: false, foreign_key: { to_table: :users }
      t.decimal    :commission_percentage, precision: 5, scale: 2, null: false
      t.datetime   :effective_from, null: false
      t.integer    :status, null: false, default: 0


      t.timestamps
    end
  end
end
