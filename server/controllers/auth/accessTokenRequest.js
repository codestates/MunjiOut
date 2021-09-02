const { isAuthorized } = require("../tokenFunctions");
const db = require("../../models");

module.exports = (req, res) => {
  const accessTokenData = isAuthorized(req);
  if (!accessTokenData) {
    return res
      .status(400)
      .json({ data: null, message: "invalid access token" });
  }

  const { id } = accessTokenData;

  db.User.findOne({ where: { id } })
    .then((data) => {
      if (!data) {
        return res.json({
          data: null,
          message: "access token has been tempered",
        });
      }
      delete data.dataValues.password;
      delete data.dataValues.salt;
      return res.json({ data: { userInfo: data.dataValues }, message: "ok" });
    })
    .catch((err) => {
      console.log(err);
    });
};
