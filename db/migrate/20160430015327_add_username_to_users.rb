class AddUsernameToUsers < ActiveRecord::Migration
  def change
    add_column :users, :username, :string # add a new column
    add_index :users, username, unique: true #indexes the username column and makes sure it is unique
  end
end
