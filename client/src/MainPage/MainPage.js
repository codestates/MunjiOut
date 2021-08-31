import "./MainPage.css";
import Header from "./Component/Header";
import Body from "./Component/Body";
import axios from "axios";

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
}) {
  // * "/" 엔드포인트에 도달 시, accessToken이 localStrage에 있는지 확인 후, isStared 배열 수정
  // axios
  // .get("https://localhost:4000/accesstokenrequest", {
  //   headers: {
  //     Authorization: `Bearer ${AT}`,
  //     "Content-Type": "application/json"
  //   },
  //   withCredentials: true,
  // })
  // .then((res) => {
  //   handleLogin();
  //   console.log('🔺', res);
  // })
  // .then(() => {
  //   axios
  //     .get("https://localhost:4000/mainpage", {
  //       headers: {
  //         Authorization: `Bearer ${AT}`,
  //         "Content-Type": "application/json"
  //       },
  //       withCredentials: true,
  //     }).then(console);
  //     .then((datas) => {
  //       rerenderIsStared(datas);
  //     });
  // })
  // .catch (console.log);

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
        />
      </div>
    </div>
  );
}
