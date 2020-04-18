class User < ApplicationRecord
    has_many :products, dependent: :destroy

    before_save :downcase_email
    
    validates :first_name, presence: true
    validates :last_name, presence: true
    validates :email, presence: true
    validates :email, presence: true, uniqueness: { case_sensitive: false },
            format: { 
                with: /\A[A-Z0-9#-_~!$&'()*+,;=:.]+@[A-Z0-9.-]+\.[A-Z]{2,4}\z/i 
            }

    def full_name
        "#{first_name} #{last_name}"
    end

    has_secure_password

    private

    def downcase_email
        self.email.downcase!
    end

end
