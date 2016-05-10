class AddCurrentLanguageAndTargetLanguageToNotes < ActiveRecord::Migration
  def change
    add_column :notes, :current_language, :string
    add_column :notes, :target_language, :string
  end
end
