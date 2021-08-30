import LocationName from "./Database/LocationName";
import MainPage from "./MainPage/MainPage";
import Signup from "./pages/SignUp";
import Login from "./pages/Login";
import Mypage from "./pages/Mypage";
import { useEffect, useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { getRegExp } from "korean-regexp";

function App() {
  const isStaredDummy = [
    { id: 1, city: "Seoul", time: "17:00", pm10value: 110 },
    { id: 2, city: "Jeju", time: "16:00", pm10value: 60 },
  ];
  const isSearchedDummy = [
    { id: 1, city: "Busan", time: "16:30", pm10value: 40 },
  ];

  const LN = LocationName.map((el) => el.locationName);
  const [keyword, setKeyword] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [searchResultIdx, setSearchResultIdx] = useState(-1);

  // * keyword가 초기화 될 때마다, searchResult 변경하는 useEffect
  useEffect(() => {
    if (!keyword) {
      setSearchResult([]);
      setSearchResultIdx(-1);
    } else {
      setSearchResult(
        LN.filter((el) => getRegExp(keyword).test(el)).filter((el, idx) =>
          idx < 5 ? el : null
        )
      );
    }
  }, [keyword]);

  // * keyword, searchResult가 변경될 때 마다, keyword가 searchResult[0]과 동일하다면 searchResult 비우는 useEffect
  // * searchResult가 비워질 때 마다, idx 초기화되는 useEffect
  useEffect(() => {
    if (keyword === searchResult[0]) setSearchResult([]);
    if (searchResult.length === 0) setSearchResultIdx(0);
  }, [keyword, searchResult]);

  // * SearchBar에 단어를 입력하면, keyword가 변경되는 event handler
  const handleKeywordChange = (e) => setKeyword(e.target.value);

  // * kewyword를 초기화하는 event handler
  const handleKeywordDelete = () => setKeyword("");

  // * DropDown에 있는 li 클릭 시 해당 내용으로 keyword update되는 event handler
  const handleDropDownClick = (e) => {
    setKeyword(e.target.innerText);
  };

  // * DropDonw에서 방향키, Enter 클릭 시 작용
  const handleDropDown = (e) => {
    if (e.key === "ArrowDown" && searchResultIdx < searchResult.length - 1) {
      setSearchResultIdx(searchResultIdx + 1);
    } else if (
      e.key === "ArrowUp" &&
      -1 < searchResultIdx &&
      searchResultIdx <= searchResult.length - 1
    ) {
      setSearchResultIdx(searchResultIdx - 1);
    }
    if (e.key === "Enter" && searchResult.length !== 0) {
      setKeyword(searchResult[searchResultIdx]);
    }
  };

  const [isLogin, setIsLogin] = useState(false);
  const [isStared, setIsStared] = useState(isStaredDummy);
  const [isSearched, setIsSearched] = useState(isSearchedDummy);

  return (
    <BrowserRouter>
      <div>
        <Switch>
          <Route exact path="/">
            <MainPage
              keyword={keyword}
              searchResult={searchResult}
              searchResultIdx={searchResultIdx}
              handleKeywordChange={handleKeywordChange}
              handleKeywordDelete={handleKeywordDelete}
              handleDropDownClick={handleDropDownClick}
              handleDropDown={handleDropDown}
              isLogin={isLogin}
              isStared={isStared}
              isSearched={isSearched}
            />
          </Route>
          <Route path="/signup">
            <Signup
              keyword={keyword}
              searchResult={searchResult}
              searchResultIdx={searchResultIdx}
              handleKeywordChange={handleKeywordChange}
              handleKeywordDelete={handleKeywordDelete}
              handleDropDownClick={handleDropDownClick}
              handleDropDown={handleDropDown}
            />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/mypage">
            <Mypage />
          </Route>
          {/* <Route>
            <EpmtyPage />
          </Route> */}
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
