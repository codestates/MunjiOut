import './Containers.css';
import CityCard from './Cards/CityCard';
import EmptyCard from './Cards/EmptyCard';

export default function Container ({ isLogin, isStared, isSearched}) {

    const staredEmptyCard = new Array(3 - (isStared.length % 3)).fill()
        .map((el, idx) => idx + 1);
    const searchedEmptyCard = new Array(3 - (isSearched.length % 3)).fill()
        .map((el, idx) => idx + 1);

    return (
        <>
            <div>
                <section className="stared">
                    <div className="title">
                        🌕 Stared City Card 🌕
                    </div>
                    <div className="staredCards">
                        {isStared.map(el => <CityCard isLogin={isLogin} data={el} stared={true} key={el.id} />)}
                        {staredEmptyCard.map(el => <EmptyCard key={el} />)}
                    </div>
                </section>
            </div>
            <div>
                <section className="searched">
                    <div className="title">
                        🌑 Searched City Card 🌑
                    </div>
                    <div className="searchedCards">
                        {isSearched.map(el => <CityCard isLogin={isLogin} data={el} stared={false} key={el.id} />)}
                        {searchedEmptyCard.map(el => <EmptyCard key={el} />)}
                    </div>
                </section>
            </div>
        </>
    );
}
