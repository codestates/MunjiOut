require('dotenv').config();
const axios = require('axios');
var Sequelize = require('sequelize');
require('sequelize-values')(Sequelize);
const db = require('../../models');

const apiKey = process.env.API_KEY;
const rowNum = 5;

module.exports = async (req, res) => {
    // console.log('++++++++++++\n', req.body);
    const stations = [];
    
    await db.UserLocation.findAll({
        include: [
            {
                model: db.Location,
                attributes: ['id', 'location_name']
            }
        ],
        where: { userId: req.body.userId },
    })
    .then((data) => {
        data = Sequelize.getValues(data);
        
        if (data.length > 0) {
            data.map((el => {
                stations.push(el.Location.location_name);
            }));
            // console.log(stations);
            async function fetchStationInfo () {
                const updated = stations.map(async (station) => {
                    station = station.split(' ')[1];
                    const encodedLocation = encodeURIComponent(station);
                    const url = `http://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getMsrstnAcctoRltmMesureDnsty?stationName=${encodedLocation}&dataTerm=month&pageNo=1&numOfRows=${rowNum}&returnType=json&serviceKey=${apiKey}`;

                    const res = await axios({
                        method: 'GET',
                        url: url,
                    });
                    
                    return {
                        station: station,
                        lastUpdated: res.data.response.body.items[0].dataTime,
                        pmValue: res.data.response.body.items[0].pm10Value
                    };
                });
                
                const results = await Promise.all(updated);
                // console.log(results);
                res.status(200).json(results);
            }
            fetchStationInfo();
        } else {
            return res.status(404).json({ message: "please choose your preferred locations" });
        }
    });
    return res.status(400);
};