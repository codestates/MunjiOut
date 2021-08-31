const { isAuthorized } = require('../tokenFunctions');
var Sequelize = require('sequelize');
require('sequelize-values')(Sequelize);
const crypto = require('crypto');
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

    let conflictMessage;

    const isEmailConflict = await db.User.findAll({
        where: {
            email: req.body.email
        }
    });

    const isMobileConflict = await db.User.findAll({
        where: {
            mobile: req.body.mobile
        }
    });

    // console.log(isEmailConflict.length + "\n"+ isMobileConflict.length);
    
    if (isEmailConflict.length > 0 || isMobileConflict.length > 0) {
        if (isEmailConflict.length > 0 && isMobileConflict.length > 0) {
            conflictMessage = "conflict: email & mobile";
        } else if (isEmailConflict.length > 0 && isMobileConflict.length == 0) {
            conflictMessage = "conflict: email";
        } else if (isEmailConflict.length == 0 && isMobileConflict.length > 0) {
            conflictMessage = "conflict: mobile";
        } 
        // console.log(conflictMessage);
        return res.status(409).json({ message: conflictMessage });
    }

    const salt = crypto.randomBytes(64).toString('hex');
    const encryptedPassword = crypto.pbkdf2Sync(req.body.password, salt, 9999, 64, 'sha512').toString('base64');
    // console.log("==============\n", encryptedPassword);
    
    try {
        await db.Location.findOrCreate({
            where: {
                location_name: req.body.address,
            },
            defaults: {
                location_name: req.body.address,
            }
        })
    } catch(err) {
        console.error(err);
    }

    try {
        await db.User.findOrCreate({
            where: {
                email: req.body.email,
            },
            defaults: {
                username: req.body.username,
                email: req.body.email,
                salt: salt,
                password: encryptedPassword,
                mobile: req.body.mobile,
                address: req.body.address
            }
        })

        const location = await db.Location.findOne({
            where: { location_name: req.body.address },
        });

        const user = await db.User.findOne({
            where: { email: req.body.email },
        });
        
        await db.UserLocation.create({
            userId: user.id,
            locationId: location.id,
        });

        res.status(201).json({ message: 'thank you for signing up!' });
    } catch(err) {
        console.error(err);
        res.status(501).json({ message: 'failed' });
    }
};