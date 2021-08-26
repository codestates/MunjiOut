const { Location } = require("../../models");
const { UserLocation } = require("../../models");

module.exports = async (req, res) => {
  try {
    const { userId, location_name } = req.body;

    const locationId = await Location.findOne({
      where: { location_name: location_name },
    });

    await UserLocation.destroy({
      userId: userId,
      locationId: locationId.id,
    });

    res.status(200).json({ message: "즐겨찾기에서 삭제되었습니다." });
  } catch {
    console.log(err);
  }
};
