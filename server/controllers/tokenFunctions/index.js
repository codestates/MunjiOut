require("dotenv").config();
const { sign, verify } = require("jsonwebtoken");

module.exports = {
  gernerateAccessToken: (data) => {
    return sign(data, process.env.ACCESS_SECRET, { expiresIn: "1h" });
  },

  sendAccessToken: (res, accessToken) => {
    res
      .cookie(`jwt=${accessToken}`, {
        httpOnly: true,
        secure: true,
        samesite: "none",
      })
      .json({ data: { accessToken }, message: "ok" });
  },

  isAuthorized: (req) => {
    const authorization = req.headers.cookie;
    if (!authorization) {
      return null;
    }
    const token = authorization.split("=")[1];
    try {
      return verify(token, process.env.ACCESS_SECRET);
    } catch (err) {
      return null;
    }
  },
};