module.exports = (req, res) => {
    // const data = isAuthorized(req);
    console.log(req.headers.cookie)
    // console.log(data);

    return res.status(205).send('Logged out successfully');
};