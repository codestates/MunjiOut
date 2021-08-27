const { User } = require("../../models");
const { isAuthorized } = require("../tokenFunctions");

module.exports = async (req, res) => {
  try {
    const data = isAuthorized(req);

    if (!data) {
      return res.status(404).send({ message: "잘못된 접근입니다." });
    } else {
      let newUserInfo = await User.update({
        where: {
          id: data.id,
        },
      });

      res
        .status(200)
        .json({ data: newUserInfo, message: "회원정보가 수정되었습니다." });
    }
  } catch {
    res.status(400).json({ message: "에러입니다." });
  }
};
