import AppDispacher from "../packs/dispacther";
import ActionTypes from '../packs/constants';
import AppEventEmitter from "./AppEventEmitter";

let _tweets = [];

class TweetEventEmitter extends AppEventEmitter{
    getAll(){
        return _tweets.map(tweet => {
            tweet.formattedDate = moment(tweet.created_at).fromNow();
            return tweet;
        });
    }

}

let TweetStore = new TweetEventEmitter();

AppDispacher.register(action => {
    switch (action.actionType) {
        case ActionTypes.RECEIVED_TWEETS:
            _tweets = action.rawTweets;
            TweetStore.emitChange();
            break;
        case ActionTypes.RECEIVED_ONE_TWEET:
            _tweets.unshift(action.rawTweet);
            TweetStore.emitChange();
            break;
        default:
        //No op
    }
});

export default TweetStore;