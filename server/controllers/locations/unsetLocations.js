const { Location } = require("../../models");
const { UserLocation } = require("../../models");
const { isAuthorized } = require("../tokenFunctions");

module.exports = async (req, res) => {
  try {
    const accessTokenData = isAuthorized(req);
    const { location_name } = req.body;

    if (!accessTokenData) {
      return res.status(404).send({ message: "로그인이 되어있지 않습니다." });
    } else {
      const locationId = await Location.findOne({
        where: { location_name: location_name },
      });

      await UserLocation.destroy({
        where: { userId: accessTokenData.id, locationId: locationId.id },
      });

      res.status(200).json({ message: "즐겨찾기에서 삭제되었습니다." });
    }
  } catch {
    res.status(400).json({ message: "에러입니다." });
  }
};
