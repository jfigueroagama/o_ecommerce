class Product < ApplicationRecord
    belongs_to :user
    has_many :comments, dependent: :destroy
    
    validates :name, presence: true
    validates :description, presence: true
    validates :price, numericality: { greater_than_or_equal_to: 100.0 }
    validates :quantity, numericality: {
        only_integer: true,
        greater_than_or_equal_to: 0
    }

    def owned_by?(owner)
        # The 'owner has to be equal than the 'user
        user == owner
    end

end
