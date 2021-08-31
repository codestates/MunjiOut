const { isAuthorized } = require("../tokenFunctions");

module.exports = async (req, res) => {
  const accessTokenData = isAuthorized(req);
  // console.log('++++++++++++\n', accessTokenData)
  if (accessTokenData) {
    const payload = {
      id: accessTokenData.id,
      email: accessTokenData.email,
      username: accessTokenData.username,
      mobile: accessTokenData.mobile,
      address: accessTokenData.address,
      createdAt: accessTokenData.createdAt,
      updatedAt: accessTokenData.updatedAt,
    };
    return res
      .status(200)
      .json({ data: { userInfo: payload }, message: " ok" });
  } else {
    return res.status(401).json({ data: null, message: "not authorized" });
  }
};
