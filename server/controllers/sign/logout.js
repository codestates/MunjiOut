const { isAuthorized } = require("../tokenFunctions");

module.exports = (req, res) => {
  const accessTokenData = isAuthorized(req);
  // 로그인 상태가 아닌데 로그아웃을 시도했을 경우
  if (!accessTokenData) {
    res.cookie("refreshToken", "");
    return res.status(403).json({ message: "you are not logged in" });
  }
  res.setHeader("authorization", "");
  res.cookie("refreshToken", "");
  return res.status(205).json({ message: "logged out successfully" });
};
