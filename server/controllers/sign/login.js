const db = require('../../models');
const { generateAccessToken, sendAccessToken } = require('../tokenFunctions');

module.exports = async (req, res) => {
    // console.log('++++++++++++\n', req.body);
    await db.User.findOne({
        where: { email: req.body.email, password: req.body.password },
    })
    .then((data) => {
        if (!data) {
            return res.status(404).send('invalid user');
        } else {
            const accessToken = generateAccessToken(data.dataValues);
            sendAccessToken(res, accessToken);
        }
    });
};