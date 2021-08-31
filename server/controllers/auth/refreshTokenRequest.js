const {
  checkRefeshToken,
  generateAccessToken,
  resendAccessToken,
} = require("../tokenFunctions");
const db = require("../../models");

module.exports = (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.json({ data: null, message: "refresh token not provided" });
  }

  const refreshTokenData = checkRefeshToken(refreshToken);
  if (!refreshTokenData) {
    return res.json({
      data: null,
      message: "invalid refresh token, please log in again",
    });
  }

  const { id } = refreshTokenData;
  db.User.findOne({ where: { id } })
    .then((data) => {
      if (!data) {
        return res.json({
          data: null,
          message: "refresh token has been tempered",
        });
      }
      delete data.dataValues.password;
      delete data.dataValues.salt;

      const newAccessToken = generateAccessToken(data.dataValues);
      resendAccessToken(res, newAccessToken, data.dataValues);
    })
    .catch((err) => {
      console.log(err);
    });
};
