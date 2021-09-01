import "./CityCard.css";
import { useState } from "react";
import { FadeLoader } from "react-spinners";

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
                선호
              </div>
            ) : null}
            {isLogin && !stared ? (
              <div
                className="pic_searched"
                value={idx}
                onClick={handleIsSearched}
              >
                선호
              </div>
            ) : null}
          </div>
          <div className="location">{stationName}</div>
          <div className="icon">
            {isNaN(Number(pm10_value)) ? "🚫 N/A" : null}
            {pm10_value <= 30 ? "🔵 Very Good!" : null}
            {30 < pm10_value && pm10_value <= 80 ? "🟢 Not Bad!" : null}
            {80 < pm10_value && pm10_value <= 150 ? "🟠 Not Good." : null}
            {150 < pm10_value ? "🔴 Very Bad..." : null}
          </div>
          <div className="value">미세먼지 {pm10_value}</div>
          <div className="likes">Likes: {isNaN(Number(pm10_value)) ? null : likes}</div>
          <div className="time">{lastUpdated}</div>
        </div>)
      }
    </div>
  );
}
