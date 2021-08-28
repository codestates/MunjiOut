const { User } = require("../../models");
const { isAuthorized, gernerateAccessToken } = require("../tokenFunctions");

module.exports = async (req, res) => {
  try {
    // const data = isAuthorized(req);

    // if (!data) {
    //   return res.status(404).send({ message: "잘못된 접근입니다." });
    // } else {

    // console.log(req.body);
    const { username, email, address } = req.body;
    console.log(req.body);

    if (!email) {
      return res
        .status(404)
        .send({ data: null, message: "존재하지 않는 유저입니다." });
    } else {
      let newUserInfo = await User.findOne({
        where: {
          email: req.body.email,
        },
      });

      if (username) {
        newUserInfo.username = username;
      }

      if (address) {
        newUserInfo.address = address;
      }

      await newUserInfo.save();

      const payload = {
        id: newUserInfo.id,
        username: newUserInfo.username,
        email: newUserInfo.email,
        mobile: newUserInfo.mobile,
        address: newUserInfo.address,
      };

      const accessToken = gernerateAccessToken(payload);

      res
        .status(200)
        .json({
          accessToken,
          data: payload,
          message: "회원정보가 수정되었습니다.",
        });
      // }
    }
  } catch {
    res.status(400).json({ message: "에러입니다." });
  }
};
