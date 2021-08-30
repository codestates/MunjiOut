const { User } = require("../../models");
const { isAuthorized } = require("../tokenFunctions");

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

      // const accessToken = gernerateAccessToken(payload);

      res.status(200).json({
        // accessToken,
        data: payload,
        message: "회원정보가 수정되었습니다.",
      });
    }
  } catch {
    res.status(400).json({ message: "에러입니다." });
  }
};

// // console.log(req.body);
// const { username, email, address } = req.body;
// console.log(req.body);
