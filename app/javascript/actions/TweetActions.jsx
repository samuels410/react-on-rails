import API from "../packs/API"
export default {
    getAllTweets() {
        API.getAllTweets();
    },
    sendTweet(body){
        API.createTweet(body);
    }

}