const { User } = require("../../models");
const { isAuthorized } = require("../tokenFunctions");

module.exports = async (req, res) => {
  try {
    const accessTokenData = isAuthorized(req);
    console.log(accessTokenData);

    if (!accessTokenData) {
      return res.status(404).send({ message: "회원정보를 다시 확인해주세요." });
    } else {
      await User.destroy({
        where: { id: accessTokenData.id },
      });

      console.log(req.headers.cookie);

      res.cookie("accessToken", "");
      res.cookie("refreshToken", "");

      res
        .status(200)
        .json({ message: "회원탈퇴가 성공적으로 완료되었습니다." });
    }
  } catch {
    res.status(400).json({ message: "에러입니다." });
  }
};
