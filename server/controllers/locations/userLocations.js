const { User } = require("../../models");
const { Location } = require("../../models");
const { UserLocation } = require("../../models");
const { isAuthorized } = require("../tokenFunctions");

module.exports = async (req, res) => {
  try {
    // const data = isAuthorized(req);

    // if (!data) {
    //   return res
    //     .status(404)
    //     .send({ data: null, message: "존재하지 않는 유저입니다." });
    // } else {

    const email = await User.findOne({
      where: { email: req.body.email },
    });
    console.log(req.body);

    if (!email) {
      return res
        .status(404)
        .send({ data: null, message: "존재하지 않는 유저입니다." });
    } else {
      const result = await User.findAll({
        where: {
          email: req.body.email,
        },
        include: [
          {
            model: UserLocation,
            required: false,
            attributes: ["userId", "locationId"],
            include: [
              {
                model: Location,
                required: false,
                attributes: ["location_name"],
              },
            ],
          },
        ],
      });

      res
        .status(200)
        .json({ data: result, message: "해당 정보를 불러왔습니다." });
      // }
    }
  } catch {
    res.status(400).json({ message: "에러입니다." });
  }
};
