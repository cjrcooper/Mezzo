class CreateWords < ActiveRecord::Migration
  def change
    create_table :words do |t|
      t.text :first_content
      t.text :second_content
      t.integer :deck_id
      t.timestamps null: false
    end
  end
end
