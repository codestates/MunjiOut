import './CityCard.css';

export default function CityCard ({ isLogin, data, stared }) {

    const { city, time, pm10value } = data;

    return (
        <div className="cityCard">
            <div className="location">{city}</div>
            <div className="pic">
                {isLogin && stared ? '🌕 stared pic' : null}
                {isLogin && !stared ? '🌑 searched pic' : null}
            </div>
            <div className="icon">
                {pm10value === undefined ? 'N/A' : null}
                {pm10value <= 50 ? '🟢 Good!' : null}
                {50 < pm10value && pm10value <= 100 ? '🟠 Not Good.' : null}
                {100 < pm10value ? '🔴 Bad...' : null}
            </div>
            <div className="value">{pm10value}</div>
            <div className="time">{time}</div>
        </div>
    );
}
