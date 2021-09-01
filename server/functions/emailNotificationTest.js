require("dotenv").config();
const axios = require("axios");
var Sequelize = require("sequelize");
require("sequelize-values")(Sequelize);
const cron = require("node-cron");
const nodemailer = require("nodemailer");
const db = require("../models");

const apiKey = process.env.API_KEY;
const rowNum = 1;

const sendEmailTest = () => {
    // 30초마다 아래 스크립트 실행
    cron.schedule('*/30 * * * * *', async () => {
        console.log("node-cron test");

        // 로컬 mysql User 테이블에 유저 id 1과 2가 있어야하고 UserLocations 테이블에는 해당 유저의 선호지역 정보가 담겨 있어야 함
        // process.env.RECEIVER_ADDRESS을 이메일을 받아보고 싶은 주소로 변경 가능
        const users = [{
                id: 1,
                username: "박먼지",
                email: process.env.RECEIVER_ADDRESS,
            },
            {
                id: 2,
                username: "최미세",
                email: process.env.RECEIVER_ADDRESS,
            }
        ];

        users.map(async (user) => {
            const stations = [];

            let locationData = await db.UserLocation.findAll({
                include: [{
                    model: db.Location,
                    attributes: ["id", "location_name"]
                }],
                where: {
                    userId: user.id
                },
            })

            locationData = Sequelize.getValues(locationData);
            
            if (locationData.length > 0) {
                locationData.map((el => {
                    stations.push(el.Location.location_name);
                }));
                // console.log(stations);
                const fetchStationInfo = async () => {
                    const stationInfo = stations.map(async (station, idx) => {
                        const fullStation = station;
                        station = station.split(" ")[1];
                        const encodedLocation = encodeURIComponent(station);
                        const url = `http://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getMsrstnAcctoRltmMesureDnsty?stationName=${encodedLocation}&dataTerm=month&pageNo=1&numOfRows=${rowNum}&returnType=json&serviceKey=${apiKey}`;

                        const res = await axios({
                            method: "GET",
                            url: url,
                        })
                        .catch((error) => {
                            console.log(error);
                        });

                        let status = "-";

                        let pmValue = res.data.response.body.items[0].pm10Value;

                        if (pmValue !== "-") {
                            pmValue = Number(pmValue);
                            if (pmValue <= 30) {
                                status = "매우 좋음 🔵"
                            } else if (30 < pmValue <= 80) {
                                status = "보통 🟢"
                            } else if (80 < pmValue && pmValue <= 150) {
                                status = "나쁨 🟠"
                            } else if (pmValue > 150) {
                                status = "매우 나쁨 🔴"
                            }
                        }

                        // 측정소가 점검 중일 경우 => pm10Value가 "-"으로 표기됨
                        if (res.data.response.body.items[0].pm10Value === "-") {
                            return {
                                "선호지역" : String(idx + 1) + "*",
                                "측정소:": fullStation,
                                "측정시간:": res.data.response.body.items[0].dataTime,
                                "상태:": "현재 측정소가 점검 중입니다.",
                                "미세먼지 농도:": status
                            };
                        }
                        return {
                            "선호지역" : String(idx + 1) + "*",
                            "측정소:": fullStation,
                            "측정시간:": res.data.response.body.items[0].dataTime,
                            "상태:": status,
                            "미세먼지 농도:": res.data.response.body.items[0].pm10Value + "㎍/㎥"
                        };
                    });

                    let results = await Promise.all(stationInfo);  
                    results = JSON.stringify(results);
                    results = results.replace(/[""{}/[^\]]+/g, "");
                    results = results.replace(":1*", " #1");
                    results = results.replace("선호지역:2*", "\n선호지역 #2");
                    results = results.replace("선호지역:3*", "\n선호지역 #3");
                    results = results.replaceAll(",", "\n");
                    results = results.replaceAll("::", ": ");
                    // console.log(results);

                    // email message options
                    const mailOptions = {
                        from: process.env.SENDER_ADDRESS,
                        to: user.email,
                        subject: "MunjiOut: 미세먼지 알림",
                        text: user.username + "님이 설정하신 지역의 미세먼지 데이터입니다.\n\n" + results
                    };
                    
                    // email transporter configuration
                    const transporter = nodemailer.createTransport({
                        service: "gmail",
                        auth: {
                            user: process.env.SENDER_ADDRESS,
                            pass: process.env.APP_PASSWORD
                        }
                    });

                    // send email
                    transporter.sendMail(mailOptions, (error, info) => {
                        if (error) {
                            console.log(error);
                        } else {
                            console.log("Email has sent: " + info.response);
                        }
                    });
                }
                fetchStationInfo();
            }
        });
    }, {
        schedule: true,
        timeZone: "Asia/Seoul"
    });
};

module.exports = {
    sendEmailTest
};