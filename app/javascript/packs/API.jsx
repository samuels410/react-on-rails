import ServerActions from '../actions/ServerActions'
export default {
    getAllTweets(){
        $.get("http://localhost:3002/tweets")
            .success(rawTweets => ServerActions.receivedTweets(rawTweets))
            .error(error => console.log(error));
    },

    createTweet(body){
        $.post("http://localhost:3002/tweets", {body})
            .success(rawTweet => ServerActions.receivedOneTweet(rawTweet))
            .error(error => console.log(error));
    },

    getAllUsers(){
        $.get("http://localhost:3002/followers/random")
            .success(rawUsers => ServerActions.receivedUsers(rawUsers))
            .error(error => console.log(error));
    },

    followUser(user_id){
        $.post("http://localhost:3002/followers", {user_id})
            .success(rawFollower => ServerActions.receivedOneFollower(rawFollower))
            .error(error => console.log(error));

    }
}