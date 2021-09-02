import "./MainPage.css";
import Header from "./Component/Header";
import Body from "./Component/Body";

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
  );
}
