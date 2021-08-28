const { User } = require("../../models");
const { isAuthorized } = require("../tokenFunctions");

module.exports = async (req, res) => {
  try {
    // const data = isAuthorized(req);

    // if (!data) {
    //   return res.status(404).send({ message: "회원정보를 다시 확인해주세요." });
    // } else {

    const email = await User.findOne({
      where: { email: req.body.email },
    });

    if (!email) {
      return res
        .status(404)
        .send({ data: null, message: "존재하지 않는 유저입니다." });
    } else {
      await User.destroy({
        // where: { id: deleteUser.id },
        where: { email: req.body.email },
      });

      res
        .status(200)
        .json({ message: "회원탈퇴가 성공적으로 완료되었습니다." });
      // }
    }
  } catch {
    res.status(400).json({ message: "에러입니다." });
  }
};
