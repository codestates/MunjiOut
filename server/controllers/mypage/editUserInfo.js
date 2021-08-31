const { User } = require("../../models");
const { isAuthorized } = require("../tokenFunctions");
const crypto = require("crypto");

module.exports = async (req, res) => {
  try {
    const accessTokenData = isAuthorized(req);

    if (!accessTokenData) {
      return res.status(404).send({ message: "로그인이 되어있지 않습니다." });
    } else {
      let newUserInfo = await User.findOne({
        where: {
          id: accessTokenData.id,
        },
      });
      // console.log(newUserInfo.dataValues);

      const salt = crypto.randomBytes(64).toString("hex");
      const encryptedPassword = crypto
        .pbkdf2Sync(req.body.password, salt, 9999, 64, "sha512")
        .toString("base64");

      const payload = {
        username: req.body.username,
        email: req.body.email,
        salt: salt,
        password: encryptedPassword,
        mobile: req.body.mobile,
        address: req.body.address,
      };

      // console.log(payload);

      await User.update(
        {
          username: payload.username,
          email: payload.email,
          salt: salt,
          password: encryptedPassword,
          mobile: payload.mobile,
          address: payload.address,
        },
        { where: { id: accessTokenData.id } }
      );

      res.status(200).json({
        data: payload,
        message: "회원정보가 수정되었습니다.",
      });
    }
  } catch {
    res.status(400).json({ message: "에러입니다." });
  }
};
