import './CityCard.css';

export default function CityCard ({ isLogin, data, stared, idx, handleIsStaredDelete, handleIsSearched }) {

    const { stationName, lastUpdated, pm10_value } = data;

    return (
        <div className="cityCard">
            <div className="location">{stationName}</div>
            <div className="pic">
                {isLogin && stared ?
                    <div
                        className="pic_stared"
                        value={idx}
                        onClick={handleIsStaredDelete}
                    >
                        선호
                    </div>
                    : 
                    null
                }
                {isLogin && !stared ? 
                        <div
                        className="pic_searched"
                        value={idx}
                        onClick={handleIsSearched}
                    >
                        선호
                    </div>
                    : 
                    null
                }
            </div>
            <div className="icon">
                {pm10_value === undefined ? '🚫 N/A' : null}
                {pm10_value <= 30 ? '🔵 Very Good!' : null}
                {30 < pm10_value && pm10_value <= 80 ? '🟢 Not Bad!' : null}
                {80 < pm10_value && pm10_value <= 150 ? '🟠 Not Good.' : null}
                {150 < pm10_value ? '🔴 Very Bad...' : null}
            </div>
            <div className="value">미세먼지 {pm10_value}</div>
            <div className="time">{lastUpdated}</div>
        </div>
    );
}
