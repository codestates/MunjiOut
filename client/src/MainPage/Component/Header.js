import Logo from "./HeaderFeature/Logo";
import Button from "./HeaderFeature/Button";
import SearchBar from "./HeaderFeature/SearchBar";
import styled from 'styled-components';

const Wrapper = styled.div`
  .header {
    padding: 5px 8px 55px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .header_space {
    margin: 10px;
  }
`
export default function Header({
  keyword,
  searchResult,
  searchResultIdx,
  handleKeywordChange,
  handleKeywordDelete,
  handleDropDownClick,
  handleDropDown,
  isLogin,
  handleLogout,
}) {
  return (
    <Wrapper>
      <div className="header">
        <Logo />
        <div className="header_space" />
        <SearchBar
          keyword={keyword}
          searchResult={searchResult}
          searchResultIdx={searchResultIdx}
          handleKeywordChange={handleKeywordChange}
          handleKeywordDelete={handleKeywordDelete}
          handleDropDownClick={handleDropDownClick}
          handleDropDown={handleDropDown}
        />
        <div className="header_space" />
        <Button isLogin={isLogin} handleLogout={handleLogout} />
      </div>
    </Wrapper>
  );
}
