require('dotenv').config();
const fetch = require('node-fetch');
const locations = require('../../api/locationList');

const apiKey = process.env.API_KEY;
const rowNum = 5;
let stationLocation;
let lastUpdated;
let pmValue;

module.exports = {
    // 예시: https://localhost:4000/search?query=서울+강남구
    findOne: (req, res) => {
        if (req.query.query !== undefined) {
            console.log(req.query.query);
            if (req.query.query.length == 0) {
                return res.status(400).json({ message: "please enter a search term" });
            }
            const list = locations.filter((location) => {
                return location.locationName == req.query.query;
            });
           
            if (list.length > 0) {
                console.log(list[0].locationName);
                stationLocation = list[0].locationName
                // console.log("station: " + stationLocation);
                // console.log(list[0].locationName);
                const encodedLocation = encodeURIComponent(stationLocation.split(' ')[1]);
                const url = `http://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getMsrstnAcctoRltmMesureDnsty?stationName=${encodedLocation}&dataTerm=month&pageNo=1&numOfRows=${rowNum}&returnType=json&serviceKey=${apiKey}`;
                fetch(url)
                .then((res) => res.json())
                .then((res) => {
                    // console.log(res.response.body.items[0]);
                    lastUpdated = res.response.body.items[0].dataTime;
                    pmValue = res.response.body.items[0].pm10Value;
                })
                .then(() =>
                    res.status(200).json({ stationName: stationLocation, lastUpdated: lastUpdated, pm10_value: pmValue })
                )
                .catch(error => {
                    throw(error);
                });
            } else {
                return res.status(404).json({ message: "please check the location name again" });
            }
        } else {
            return res.status(400);
        }
    }
};