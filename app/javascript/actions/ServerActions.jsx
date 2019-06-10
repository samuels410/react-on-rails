import AppDispacher from "../packs/dispacther"
import ActionTypes from '../packs/constants'
export default{
    receivedTweets(rawTweets){
        AppDispacher.dispatch({
            actionType: ActionTypes.RECEIVED_TWEETS,
            rawTweets
        })
    },
    receivedOneTweet(rawTweet){
        AppDispacher.dispatch({
            actionType: ActionTypes.RECEIVED_ONE_TWEET,
            rawTweet
        })
    },
    receivedUsers(rawUsers){
        AppDispacher.dispatch({
            actionType: ActionTypes.RECEIVED_USERS,
            rawUsers
        })
    },
    receivedOneFollower(rawFollower){
        AppDispacher.dispatch({
            actionType: ActionTypes.RECEIVED_ONE_FOLLOWER,
            rawFollower
        })
    }
}