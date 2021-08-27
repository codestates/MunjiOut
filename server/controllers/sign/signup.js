const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const db = require('../../models');
const { generateAccessToken } = require('../tokenFunctions');

module.exports = async (req, res) => {
    // console.log('++++++++++++\n', req.body)
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
            const jwt = generateAccessToken(result.dataValues);
            res.cookie('jwt', jwt).status(201).json({ message: 'thank you for signing up!' });
        });
    });
};