import AppDispacher from "../packs/dispacther";
import AppEventEmitter from "./AppEventEmitter";
import ActionTypes from "../packs/constants";

let _users = [];
let _followedIds = [];

class UserEventEmitter extends AppEventEmitter{
    getAll(){
        return _users.map( user=> {
            user.following = _followedIds.indexOf(user.id) >= 0;
            return user;
        });
    }
}

let UserStore = new UserEventEmitter();

AppDispacher.register(action => {
    switch (action.actionType) {
        case ActionTypes.RECEIVED_USERS:
            _users = action.rawUsers;
            UserStore.emitChange();
            break;
        case ActionTypes.RECEIVED_ONE_FOLLOWER:
            _followedIds.push(action.rawFollower.user_id);
            UserStore.emitChange();
            break;
        default:
        //No op
    }
});

export default UserStore;