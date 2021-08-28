const db = require('../../models');
const { generateAccessToken, generateRefreshToken, isAuthorized } = require('../tokenFunctions');

module.exports = async (req, res) => {
    // console.log('++++++++++++\n', req.body);
    const accessTokenData = isAuthorized(req);
    // console.log(accessTokenData);

    if (accessTokenData) {
        return res.status(409).json({ message: 'you are already logged in' });
    }
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).send({ message: 'please enter a valid email or password' });
    }
    
    try {
        await db.User.findOne({
            where: { email: req.body.email, password: req.body.password },
        })
        .then((data) => {
            if (!data) {
                return res.status(404).send({ message: 'login failed: invalid user' });
            } else {
                const accessToken = generateAccessToken(data.dataValues);
                const refreshToken = generateRefreshToken(data.dataValues);
                const cookieOptions = {
                    httpOnly: true,
                    sameSite: 'None',
                    secure: true,
                }
                  
                res.cookie('accessToken', accessToken, cookieOptions);
                res.cookie('refreshToken', refreshToken, cookieOptions);
                return res.status(200).json({ accessToken, refreshToken, message: 'logged in successfully'});
            }
        });
    } catch(err) {
        console.error(err);
    }
};