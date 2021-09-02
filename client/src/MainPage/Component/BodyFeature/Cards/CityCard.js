// import "./CityCard.css";
import { useState } from "react";
import { FadeLoader } from "react-spinners";

import styled from 'styled-components';
import { media } from '../../../../components/utils/_media-queries';
import { fonts, colors } from '../../../../components/utils/_var';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDizzy,
  faSmile,
  faMeh,
  faFrown,
  faStar,
} from "@fortawesome/free-solid-svg-icons";

const Wrapper = styled.div`
  .cityCard,
  .cityCard_isLoading {
    margin: 10px 10px 23px;
    width: 30vw;
    height: 200px;
    text-align: center;
    border-radius: 0px;
    /* border: 2px solid black; */
    box-shadow: 3px 3px 3px rgba(19, 19, 19, 0.4);
    background-color: #fff2c2;
    font-size: 16px;
  }
  .cityCard_isLoading {
    text-align: justify;
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0.3;
  }
  .cityCard:hover {
    background-color: white;
    transition: 0.2s ease-in-out;
  }
  .pic_stared,
  .pic_searched {
    position: relative;
    /* background-color: gold; */
    margin: 10px;
    padding-top: 5px;
    text-align: right;
  }
  .pic_stared {
    ${media.huge`font-size: 27px;`}
    ${media.tablet`font-size: 20px;`}
    color: ${colors.yellow};
    -webkit-text-stroke-width: 2px;
    -webkit-text-stroke-color: ${colors.darkGray}
  }
  .pic_searched {
    ${media.huge`font-size: 28px;`}
    ${media.tablet`font-size: 25px;`}
    color: ${colors.darkGray};
  }
  .pic_stared:hover,
  .pic_searched:hover {
    /* background-color: rgb(255, 230, 89); */
    cursor: pointer;
    transition: all 0.5s;
  }
  .spacing {
    margin-bottom: 10px;
    font-size: 15px;
    visibility: hidden;
    /* background-color: red; */
  }
  .location {
    position: relative;
    font-family: ${fonts.jua};
    ${media.huge`font-size: 22px; padding-top: 0px;`}
    ${media.tablet`font-size: 20px; padding-top: 14px;`}
  }
  .icon {
    position: relative;
    padding-bottom: 1px;
    font-weight: bold;
  }
  /* .likes {
    position: relative;
    text-align: right;
    margin-top: -13px;
    right: 19px;
  } */
  .likes {
    font-family: ${fonts.noto}, sans-serif;
  }
  .value {
    position: relative;
    font-family: ${fonts.dohyun};
    ${media.huge`font-size: 17px;`}
    ${media.tablet`font-size: 14px;`}
    color: #666666;
    margin: 5px 0px;
    /* font-weight: bold; */
  }
  .time {
    position: relative;
    ${media.huge`font-size: 14px;`}
    ${media.tablet`font-size: 13px;`}
    font-family: ${fonts.ibm};
    font-weight: 500;
    color: gray;
    /* width: 80%;
    top: 175px; */
  }
`
export default function CityCard({
  isLogin,
  data,
  stared,
  idx,
  handleIsStaredDelete,
  handleIsSearched,
  isLoading,
  isStaredLoading
}) {
  console.log('⭐️ isStaredLoading: ', isStaredLoading);
  const { stationName, lastUpdated, pm10_value, likes } = data;

  return (
      <div className={(isLoading && idx === 0) || (isStaredLoading && stared) ? "cityCard_isLoading" : "cityCard"}>
      {(isLoading && idx === 0) || (isStaredLoading && stared) ? 
        ( <FadeLoader />) 
        : 
        (<div>
            <div className="pic">
              {isLogin && stared ? (
                <div
                  className="pic_stared"
                  value={idx}
                  onClick={handleIsStaredDelete}
                >
                  ★
                </div>
              ) : null}
              {isLogin && !stared ? (
                <div
                  className="pic_searched"
                  value={idx}
                  onClick={handleIsSearched}
                >
                  ☆
                </div>
              ) : null}
              {!isLogin && !stared ? (
                <div
                  className="pic_searched"
                  value={idx}
                  onClick={handleIsSearched}
                >
                <div className="spacing">.</div>
                </div>
              ) : null}
              {/* <div className="likes">{isNaN(Number(pm10_value)) ? null : likes}</div> */}
            </div>
            <div className="location">{stationName}</div>
            <div className="time">{lastUpdated}</div>
            <span className="icon">
              {pm10_value === undefined ? "🚫 N/A" : null}
              {pm10_value <= 30 ? (
                <FontAwesomeIcon icon={faSmile} size="7x" color="blue"/>
              ) : null}
              {30 < pm10_value && pm10_value <= 80 ? (
                <FontAwesomeIcon icon={faMeh} size="7x" color="green" />
              ) : null}
              {80 < pm10_value && pm10_value <= 150 ? (
                <FontAwesomeIcon icon={faFrown} size="7x" color="orange"/>
              ) : null}
              {150 < pm10_value ? (
                <FontAwesomeIcon icon={faDizzy} size="7x" color="red" />
              ) : null}
            </span>
            <span className="values">
              <div className="value">
                {" "}
                {pm10_value === undefined ? "🚫 N/A" : null}
                {pm10_value <= 30 ? "좋음" : null}
                {30 < pm10_value && pm10_value <= 80 ? "보통" : null}
                {80 < pm10_value && pm10_value <= 150 ? "나쁨" : null}
                {150 < pm10_value ? "매우나쁨" : null}
              </div>
              <div className="value">미세먼지: {pm10_value}</div>
            </span>
            {/* <div className="value">{isNaN(Number(pm10_value)) ? "현재 측정소가 점검 중입니다." : "미세먼지: " + pm10_value}</div> */}
            {/* <div className="value">미세먼지 {pm10_value}</div> */}
            <div className="likes">⭐ {likes} </div>
            {/* <div className="likes">⭐ {isNaN(Number(pm10_value)) ? null : likes}</div> */}
          </div>)
          }
      </div>
  );
}