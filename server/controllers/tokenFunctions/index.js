require('dotenv').config();
const { sign, verify } = require('jsonwebtoken');

module.exports = {
    generateAccessToken: data => {
        return sign(data, process.env.ACCESS_SECRET, { expiresIn: '1h' });
    },
    sendAccessToken: async (res, accessToken) => {
      await res.cookie('set-cookie', { jwt : accessToken }, { httpOnly: true, Secure: true, SameSite: "None" }).send({ message: 'ok' });
    },
    isAuthorized: req => {
      const accessToken = req["set-cookie"];
      console.log(accessToken);
      if (accessToken) {
          const payload = verify(accessToken.jwt, process.env.ACCESS_SECRET);
          return payload;
      } else {
          return null;
      }
    },
};