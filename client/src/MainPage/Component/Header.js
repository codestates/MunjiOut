import "./Header.css";
import Logo from "./HeaderFeature/Logo";
import Button from "./HeaderFeature/Button";
import SearchBar from "./HeaderFeature/SearchBar";

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
  getUserinfo,
}) {
  return (
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
  );
}
