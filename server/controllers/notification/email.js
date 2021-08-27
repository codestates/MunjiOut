var Sequelize = require('sequelize');
require('sequelize-values')(Sequelize);

const db = require('../../models');

module.exports = async (req, res) => {
    // console.log('++++++++++++\n', req.body);
    const stations = [];

    await db.UserLocation.findAll({
        where: { userId: req.body.userId },
    })
    .then((data) => {
        // console.log(Sequelize.getValues(data));
        data = Sequelize.getValues(data);
        if (data.length > 0) {
            data.map((el => {
                stations.push(el.locationId);
            }));
            console.log(stations);
        }
    });

    db.Location.findAll()
    .then((data) => {
        // console.log(Sequelize.getValues(data));
        const stationList = Sequelize.getValues(data);
        const pLocation = [];
        stationList.filter((station) => {
            if (stations.includes(station.id)) {
                pLocation.push(station.location_name);
            }
        })
        console.log(pLocation);
        return res.status(200).send(pLocation);
    })

    return res.status(400);
};