const { UserLocation } = require("../../models");
const { isAuthorized } = require("../tokenFunctions");

module.exports = async (req, res) => {
  try {
    const data = isAuthorized(req);

    if (!data) {
      return res
        .status(404)
        .send({ data: null, message: "존재하지 않는 유저입니다." });
    } else {
      const result = await UserLocation.findOne({ where: { userId: data.id } });

      res
        .status(200)
        .json({ data: result, message: "해당 정보를 불러왔습니다." });
    }
  } catch {
    console.log(err);
  }
};
