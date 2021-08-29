require('dotenv').config();
const fetch = require('node-fetch');

const apiKey = process.env.API_KEY;
const rowNum = 1;
let stationLocation;
let lastUpdated;
let pmValue;

module.exports = {
    // 예시: http://localhost:4000/search?query=서울+강남구
    findOne: (req, res) => {
        if (req.query.query !== undefined) {
            console.log(req.query.query);
            if (req.query.query.length == 0) {
                return res.status(400).json({ message: "please enter a search term" });
            }
           
            stationLocation = req.query.query
            // console.log("station: " + stationLocation);
            const encodedLocation = encodeURIComponent(stationLocation.split(' ')[1]);
            const url = `http://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getMsrstnAcctoRltmMesureDnsty?stationName=${encodedLocation}&dataTerm=month&pageNo=1&numOfRows=${rowNum}&returnType=json&serviceKey=${apiKey}`;
            fetch(url)
            .then((res) => res.json())
            .then((res) => {
                // console.log(res.response.body.items[0]);
                lastUpdated = res.response.body.items[0].dataTime;
                pmValue = res.response.body.items[0].pm10Value;
            })
            .then(() => {
                if (pmValue === "-") {
                    res.status(200).json({ stationName: stationLocation, lastUpdated: lastUpdated, pm10_value: "현재 측정소가 점검 중입니다." })
                }
                res.status(200).json({ stationName: stationLocation, lastUpdated: lastUpdated, pm10_value: pmValue })
            })
            .catch(error => {
                throw(error);
            });
            
        } else {
            return res.status(400);
        }
    }
};
