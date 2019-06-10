class TweetsController < ApplicationController
  # before_action :authenticate_user!
  skip_before_action :verify_authenticity_token

  def index
    # render json: Tweet.stream_for(current_user.id)
    render json: Tweet.all #stream_for(current_user.id)
  end

  def create
    tweet = Tweet.create(body: params[:body], user_id: current_user.id)
    render json: tweet
  end

end
