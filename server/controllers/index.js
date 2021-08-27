module.exports = {
    auth: require('./sign/auth'),
    signup: require('./sign/signup'),
    login: require('./sign/login'),
    logout: require('./sign/logout'),
    search: require('./search/search'),
    email: require('./notification/email'),
    mainpage: require('./mainpage/mainpage'),
    userinfo: require("./mypage/userinfo"),
    editUserinfo: require("./mypage/editUserInfo"),
    withdrawal: require("./mypage/withdrawal"),
};