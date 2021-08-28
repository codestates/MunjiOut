const { User } = require("../../models");
const { isAuthorized } = require("../tokenFunctions");

module.exports = async (req, res) => {
  try {
    const data = isAuthorized(req);

    if (!data) {
      return res.status(404).send({ message: "회원정보를 다시 확인해주세요." });
    } else {
      await User.destroy({
        // where: { id: deleteUser.id },
        where: { id: data.id },
      });

      res
        .status(200)
        .json({ message: "회원탈퇴가 성공적으로 완료되었습니다." });
    }
  } catch {
    console.log(err);
  }
};
