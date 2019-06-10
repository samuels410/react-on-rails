import API from "../packs/API"
export default {

    getAllUsers() {
        API.getAllUsers();
    },

    followUser(userId) {
        API.followUser(userId);
    }
}