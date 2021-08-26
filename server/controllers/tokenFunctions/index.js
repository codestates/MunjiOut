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
        const authorization = req.headers.cookie;
        if (!authorization) {
            return null;
        }
        const token = authorization.split("=")[1];
        try {
            return verify(token, process.env.ACCESS_SECRET);
        } catch (err) {
            return null;
        }
    },
};