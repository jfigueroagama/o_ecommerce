module ApplicationHelper
    
    def commented_by(user)
        user.full_name
    end

    def persisted_comments(comments)
        comments.reject { |comment| comment.new_record? }
    end

end
