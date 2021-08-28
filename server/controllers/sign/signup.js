const { isAuthorized } = require('../tokenFunctions');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const db = require('../../models');

module.exports = async (req, res) => {
    // console.log('++++++++++++\n', req.body)
    const accessTokenData = isAuthorized(req);

    // 이미 로그인 중인 상태에서 회원가입을 시도하는 경우
    if (accessTokenData) {
        return res.status(403).json({ message: 'you are already a user' });
    }

    if (
        !req.body.username ||
        !req.body.email ||
        !req.body.password ||
        !req.body.mobile ||
        !req.body.address
    ) {
        return res.status(422).json({ message: 'insufficient parameters supplied' });
    }

    await db.User.findOne({
        where: {
            [Op.or]: [{
                username: req.body.username
            }],
            [Op.or]: [{
                email: req.body.email
            }],
            [Op.or]: [{
                mobile: req.body.mobile
            }]
        }
    })
    .then(() => {
        db.User.findOrCreate({
            where: {
                email: req.body.email,
            },
            defaults: {
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                mobile: req.body.mobile,
                address: req.body.address
            }
        })
        .then(([result, created]) => {
            if (!created) {
                return res.status(409).json({ message: 'conflicting user info exists' });
            }
            // console.log('++++++++++++\n', result.dataValues);
        });
    });
};