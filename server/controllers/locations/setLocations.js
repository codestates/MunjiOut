const { Location } = require("../../models");
const { UserLocation } = require("../../models");

module.exports = async (req, res) => {
  try {
    console.log(req.body);
    const { userId, location_name } = req.body;

    const locationId = await Location.findOne({
      where: { location_name: location_name },
    });

    await UserLocation.create({
      userId: userId,
      locationId: locationId.id,
    });

    res.status(200).json({ message: "즐겨찾기에 추가하였습니다." });
  } catch {
    res.status(400).json({ message: "에러입니다." });
  }
};
