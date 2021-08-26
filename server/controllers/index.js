module.exports = {
    auth: require('./sign/auth'),
    signup: require('./sign/signup'),
    login: require('./sign/login'),
    logout: require('./sign/logout'),
    userinfo: require("./mypage/userinfo"),
    editUserinfo: require("./mypage/editUserInfo"),
    withdrawal: require("./mypage/withdrawal"),
};