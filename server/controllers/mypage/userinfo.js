const { User } = require("../../models");
const { isAuthorized } = require("../tokenFunctions");

module.exports = async (req, res) => {
  try {
    const accessTokenData = isAuthorized(req);
    console.log("accessData :", accessTokenData);

    if (!accessTokenData) {
      return res
        .status(404)
        .send({ data: null, message: "존재하지 않는 유저입니다." });
    } else {
      // password 삭제
      delete accessTokenData.password;
      console.log(req.body);

      const userInfo = await User.findOne({
        where: { id: accessTokenData.id },
      });

      res
        .status(200)
        .json({ data: userInfo, message: "유저정보를 불러왔습니다." });
    }
  } catch {
    res.status(400).json({ message: "에러입니다." });
  }
};
