// import "./Containers.css";
import CityCard from "./Cards/CityCard";
import EmptyCard from "./Cards/EmptyCard";

import styled from 'styled-components';
import { media } from '../../../components/utils/_media-queries';
import { fonts, colors } from '../../../components/utils/_var';

const Wrapper = styled.div`
  .stared_container,
  .searched_container {
    margin: 10px 10px 20px;
    padding-top: 5px;
    border-radius: 8px;
    /* border: 2px solid black; */
    background-color: gray;
  }

  .title {
    margin-top: 6px;
    margin-left: 15px;
    color: white;
    font-size: 16px;
    font-family: ${fonts.ibm};
    font-weight: 700;
  }
  .stared_cards,
  .searched_cards {
    display: flex;
    flex-wrap: wrap;
    /* flex-direction: row; */
    justify-content: space-evenly;
  }
`
export default function Container({
  isLogin,
  isStared,
  isSearched,
  handleIsStaredDelete,
  handleIsSearched,
  isLoading,
  isStaredLoading
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
    <Wrapper>
      <>
        <div>
          <section className="stared_container">
            <div className="title">💖 관심 지역</div>
            <div className="stared_cards">
              {isStared.map((el, idx) => (
                <CityCard
                  key={idx}
                  isLogin={isLogin}
                  data={el}
                  stared={true}
                  idx={idx}
                  handleIsStaredDelete={handleIsStaredDelete}
                  isStaredLoading={isStaredLoading}
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
            <div className="title">🔍 검색 지역</div>
            <div className="searched_cards">
              {isSearched.map((el, idx) => (
                <CityCard
                  key={idx}
                  isLogin={isLogin}
                  data={el}
                  stared={false}
                  idx={idx}
                  handleIsSearched={handleIsSearched}
                  isLoading={isLoading}
                />
              ))}
              {searchedEmptyCard.map((el) => (
                <EmptyCard key={el} />
              ))}
            </div>
          </section>
        </div>
      </>
    </Wrapper>
  );
}
