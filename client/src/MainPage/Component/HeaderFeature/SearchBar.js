import styled from 'styled-components';
import { colors } from '../../../components/utils/_var';
import { media, media_min } from '../../../components/utils/_media-queries';

const Wrapper = styled.div`
  .searchContainer {
    margin: 0px;
    display: flex;
    position: absolute;
    right: 15px;
    top: -95px;
  }
  .searchBar {
    ${media.searchLarge`width: 80vw;`}
    ${media.laptop`width: 65vw;`}
    ${media.tablet`width: 50vw; font-size: 13px;`}
    ${media.largeMobile`width: 40vw; font-size: 12px;`}
    /* ${media.mobile`width: 40vw; font-size: 12px;`} */
    padding: 4px 12px;
    width: 80vw;
    height: 32px;
    font-size: 14px;
    border-radius: 12px 0 0 12px;
    border: 2px solid ${colors.darkGray};
  }
  .searchBar:focus {
    outline: none;
  }
  .searchBar,
  .deleteBtn {
    margin-top: 150px;
  }
  .deleteBtn {
    font-size: 20px;
    width: 45px;
    height: 44px;
    color: ${colors.darkGray};
    font-size: 25px;
    background-color: gold;
    border-radius: 0 12px 12px 0;
    border: 2px solid ${colors.darkGray};
    border-left-style: none;
  }
  .deleteBtn:hover {
    background-color: ${colors.darkGray};
    color: white;
    transition: all 0.5s;
    cursor: pointer;
  }
  .searchList {
    position: absolute;
    z-index: 1;
    margin: 193px 0px;
    padding: 4px 12px;
    width: 50vw;
    border-radius: 12px;
    background-color: white;
    border: 0.3px solid gray;
  }
  .resultList,
  .hoverList {
    list-style: none;
    font-size: 14px;
    margin: 5px;
    padding: 8px 4px;
  }
  .resultList:hover,
  .hoverList {
    background-color: whitesmoke;
    font-weight: bold;
    color: orange;
    cursor: pointer;
  }
`

export default function SearchBar({
  keyword,
  searchResult,
  searchResultIdx,
  handleKeywordChange,
  handleKeywordDelete,
  handleDropDownClick,
  handleDropDown,
}) {
  return (
    <Wrapper>
      <div>
        <div className="searchContainer">
          {/* <button className="deleteBtn" onClick={handleKeywordDelete}>
            &times;
          </button> */}
          <input
            type="text"
            className="searchBar"
            placeholder="미세먼지 수치가 궁금한 지역을 입력하세요!"
            value={keyword}
            onChange={(e) => handleKeywordChange(e)}
            onKeyUp={(e) => handleDropDown(e)}
          />
          <button className="deleteBtn" onClick={handleKeywordDelete}>
            &times;
          </button>
          {searchResult.length === 0 ? null : (
          <div className="searchList">
            {searchResult.map((el, idx) => (
              <li
                className={searchResultIdx === idx ? "hoverList" : "resultList"}
                value={el}
                onClick={(e) => {
                  handleDropDownClick(e);
                }}
                key={idx}
              >
                {el}
              </li>
            ))}
          </div>
        )}
        </div>
        
      </div>
    </Wrapper>
  );
}
