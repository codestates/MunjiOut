import Header from "./Component/Header";
import Body from "./Component/Body";
import styled from 'styled-components';

const Wrapper = styled.div`
  .mainPage {
    background-color: #f8f8f8;
    height: 200vh;
  }
  .mainPage_header {
    z-index: 1;
  }
  .mainPage_body {
    z-index: 0;
  }
`

export default function MainPage({
  keyword,
  searchResult,
  searchResultIdx,
  handleKeywordChange,
  handleKeywordDelete,
  handleDropDownClick,
  handleDropDown,
  isLogin,
  isStared,
  isSearched,
  handleLogout,
  handleIsStaredDelete,
  handleIsSearched,
  isLoading,
  isStaredLoading
}) {

  return (
    <Wrapper>
      <div className="mainPage">
        <div className="mainPage_header">
          <Header
            keyword={keyword}
            searchResult={searchResult}
            searchResultIdx={searchResultIdx}
            handleKeywordChange={handleKeywordChange}
            handleKeywordDelete={handleKeywordDelete}
            handleDropDownClick={handleDropDownClick}
            handleDropDown={handleDropDown}
            isLogin={isLogin}
            handleLogout={handleLogout}
          />
        </div>
        <div className="mainPage_body">
          <Body
            isLogin={isLogin}
            isStared={isStared}
            isSearched={isSearched}
            handleIsStaredDelete={handleIsStaredDelete}
            handleIsSearched={handleIsSearched}
            isLoading={isLoading}
            isStaredLoading={isStaredLoading}
          />
        </div>
      </div>
    </Wrapper>
  );
}
