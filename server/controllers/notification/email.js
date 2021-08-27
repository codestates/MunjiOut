const db = require('../../models');

module.exports = async (req, res) => {
    // console.log('++++++++++++\n', req.body);
    const stations = [];

    await db.UserLocation.findAll({
        where: { userId: req.body.userId },
    })
    .then((data) => {
        if (data.length > 0) {
            // console.log(data[0].dataValues.locationId)
            data.map((el => {
                stations.push(el.dataValues.locationId);
            }));
            console.log(stations);
            // const list = [];
            const list = db.User.findOne({
                where: { id: 1 }
            });
            // stations.map((el) => {
            //     list.push(db.Location.findOne({
            //         where: { id: el }
            //     }))
            // })
            console.log(list instanceof db.User);
            console.log(list.id);
            return res.status(200).send(stations);
        }
        return res.status(404).json( { message: "no preferred locations selected" } );
    });
    return res.status(400);
};