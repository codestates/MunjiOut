import "./Containers.css";
import CityCard from "./Cards/CityCard";
import EmptyCard from "./Cards/EmptyCard";

export default function Container({
  isLogin,
  isStared,
  isSearched,
  handleIsStaredDelete,
  handleIsSearched,
}) {
  const staredEmptyCardLen = 3 - isStared.length || 0;  
  const searchedEmptyCardLen =
    isSearched.length % 3 === 0 && isSearched.length !== 0
      ? 0
      : 3 - (isSearched.length % 3);
  const staredEmptyCard = new Array(staredEmptyCardLen)
    .fill()
    .map((el, idx) => idx);
  const searchedEmptyCard = new Array(searchedEmptyCardLen)
    .fill()
    .map((el, idx) => idx);

  return (
    <>
      <div>
        <section className="stared_container">
          <div className="title">선호 지역</div>
          <div className="stared_cards">
            {isStared.map((el, idx) => (
              <CityCard
                key={idx}
                isLogin={isLogin}
                data={el}
                stared={true}
                idx={idx}
                handleIsStaredDelete={handleIsStaredDelete}
              />
            ))}
            {staredEmptyCard.map((el) => (
              <EmptyCard key={el} />
            ))}
          </div>
        </section>
      </div>
      <div>
        <section className="searched_container">
          <div className="title">검색 지역</div>
          <div className="searched_cards">
            {isSearched.map((el, idx) => (
              <CityCard
                key={idx}
                isLogin={isLogin}
                data={el}
                stared={false}
                idx={idx}
                handleIsSearched={handleIsSearched}
              />
            ))}
            {searchedEmptyCard.map((el) => (
              <EmptyCard key={el} />
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
