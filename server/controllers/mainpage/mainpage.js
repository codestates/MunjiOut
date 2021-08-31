require('dotenv').config();
const axios = require('axios');
const db = require('../../models');
const { isAuthorized } = require('../tokenFunctions');

const apiKey = process.env.API_KEY;
const rowNum = 1;

module.exports = async (req, res) => {
    // console.log('++++++++++++\n', req.body);
    const accessTokenData = isAuthorized(req);
    // console.log(accessTokenData);
    if (!accessTokenData) {
        // 로그인 상태가 아닌 경우
        // 이 경우에는 유저 전용 메인페이지가 아니라 검색기능만 가능한 홈페이지으로 리다이렉트 되면 좋을 것 같습니다
        return res.status(403).json({ message: 'you are not logged in' });
    }
    const stations = [];
    
    let locationData = await db.UserLocation.findAll({
        include: [
            {
                model: db.Location,
                attributes: ['id', 'location_name']
            }
        ],
        where: { userId: accessTokenData.id },
    });

    if (locationData.length > 0) {
        locationData.map((el => {
            stations.push(el.Location.location_name);
        }));
        // console.log(stations);
        const fetchStationInfo = async () => {
            const stationInfo = stations.map(async (station) => {
                const stationData = station;
                station = station.split(' ')[1];
                const encodedLocation = encodeURIComponent(station);
                const url = `http://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getMsrstnAcctoRltmMesureDnsty?stationName=${encodedLocation}&dataTerm=month&pageNo=1&numOfRows=${rowNum}&returnType=json&serviceKey=${apiKey}`;

                const res = await axios({
                    method: 'GET',
                    url: url,
                });

                const locationInfo = await db.Location.findOne({
                    where: {
                        location_name: stationData
                    }
                });

                const howManyLikes = await db.UserLocation.findAll({
                    where: {
                        locationId: locationInfo.id
                    }
                });

                // console.log("++++++++++\n" + howManyLikes.length);

                // 측정소가 점검 중일 경우 => pm10Value가 "-"으로 표기됨
                if (res.data.response.body.items[0].pm10Value === "-") {
                    return {
                        stationName: stationData,
                        lastUpdated: res.data.response.body.items[0].dataTime,
                        pm10_value: "the station is currently under inspection.",
                        likes: howManyLikes.length
                    };
                }
                return {
                    stationName: stationData,
                    lastUpdated: res.data.response.body.items[0].dataTime,
                    pm10_value: Number(res.data.response.body.items[0].pm10Value),
                    likes: howManyLikes.length
                };
            });
            
            const results = await Promise.all(stationInfo);
            // console.log(results);
            res.status(200).json({ data: results, message: "ok"});
        }
        fetchStationInfo();
    } else {
        return res.status(404).json({ data: null, message: "please choose your preferred locations" });
    }
    return res.status(400);
};