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
                        🌕 stared pic
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
                        🌑 searched pic
                    </div>
                    : 
                    null
                }
            </div>
            <div className="icon">
                {pm10_value === undefined ? 'N/A' : null}
                {pm10_value <= 50 ? '🟢 Good!' : null}
                {50 < pm10_value && pm10_value <= 100 ? '🟠 Not Good.' : null}
                {100 < pm10_value ? '🔴 Bad...' : null}
            </div>
            <div className="value">{pm10_value}</div>
            <div className="time">{lastUpdated}</div>
        </div>
    );
}
