class UsersController < ApplicationController
  def index
<<<<<<< HEAD
    @users = User.where("name LIKE(?)", "%#{params[:keyword]}%")
    respond_to do |format|
      # format.html
=======
    @users = User.where("name LIKE(?)", "%#{params[:keyword]}%").where.not(id: current_user.id).limit(10)
    respond_to do |format|
>>>>>>> 6555e78ac36df86841e426df84ec7aa310e6448a
      format.json
    end
  end

  def edit
  end

  def update
    if current_user.update(user_params)
      redirect_to root_path
    else
      render :edit
    end
  end

  private

  def user_params
    params.require(:user).permit(:name, :email)
  end
end
