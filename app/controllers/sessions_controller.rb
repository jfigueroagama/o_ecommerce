class SessionsController < ApplicationController
  
  def new
    # We redirect to the Home page if there is a current_user already
    redirect_to root_path if current_user 
  end

  def create
    # Find the user by downcase eMail address
    user = User.find_by(email: params[:email].downcase)
    # Check if the user can be authenticated usin the password
    if user && user.authenticate(params[:password])
      cookies.signed[:user_id] = user.id
      flash[:notice] = "User signed in succesfully"
      redirect_to root_path
    else
      flash.now[:alert] = "Invalid email/password"
      render :new
    end
  end

  def destroy
    cookies.delete :user_id
    flash[:notice] = "You signed out"
    redirect_to root_path
  end

end
