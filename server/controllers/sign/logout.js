const { isAuthorized } = require('../tokenFunctions');

module.exports = (req, res) => {
    const accessTokenData = isAuthorized(req);

    if (!accessTokenData) {
        res.cookie('refreshToken', '');
        return res.status(400).json({ message: 'you are not logged in' });
    }
    res.cookie('accessToken', '');
    res.cookie('refreshToken', '');
    return res.status(205).json({ message: 'logged out successfully' });
}