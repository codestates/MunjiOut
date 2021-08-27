import LocationName from "./Database/LocationName";
import MainPage from "./MainPage/MainPage";
import Signup from "./pages/SignUp";
import Login from "./pages/Login";
import Mypage from "./pages/Mypage";
import { useEffect, useState } from "react";
import { BrowserRouter, Route, Switch } from 'react-router-dom';

function App() {
  // SearchBar test Start
  const LN = LocationName.map(el => el.locationName);

  const isStaredDummy = [
    { id: 1, city: "Seoul", time: "17:00", pm10value: 110 },
    { id: 2, city: "Jeju", time: "16:00", pm10value: 60 },
  ];
  const isSearchedDummy = [
    { id: 1, city: "Busan", time: "16:30", pm10value: 40 },
  ];

  const [keyword, setKeyword] = useState("");
  const [searchResult, setSearchResult] = useState(LN);

  // * keyword가 초기화 될 때마다, searchResult 변경하는 useEffect
  useEffect(() => {
    if (!keyword) {
      setSearchResult(LN);
    }
    console.log('🔵', keyword, '🟡', searchResult);
  }, [keyword]);

  // * SearchBar에 단어를 입력하면, keyword가 변경되는 event handler
  const handleKeywordChange = (e) => setKeyword(e.target.value);
  
  // * kewyword를 초기화하는 event handler
  const handleKeywordDelete = () => setKeyword("");

  // * SearchBar에 단어를 입력하면, DropDown & 클릭 시 event 발생하는 event handler
  const handleDropDownClick = (e) => {
    setKeyword(e.target.innerHTML);
    setSearchResult(LN.filter(el => el.includes(e.target.innerHTML)));
  };

  // SearchBar test End

  // ! Router test를 위해선 isLogin useState 값을 true, false로 변경하세요!
  const [isLogin, setIsLogin] = useState(false);
  const [isStared, setIsStared] = useState(isStaredDummy);
  const [isSearched, setIsSearched] = useState(isSearchedDummy);

  function handleIsLogin () {
    setIsLogin(!isLogin);
  }

  return (
    <BrowserRouter>
      <div>
        <Switch>
          <Route exact path="/">
            <MainPage
            keyword={keyword}
            searchResult={searchResult}
            handleKeywordChange={handleKeywordChange}
            handleKeywordDelete={handleKeywordDelete}
            handleDropDownClick={handleDropDownClick}
            isLogin={isLogin}
            isStared={isStared}
            isSearched={isSearched}
            />
          </ Route>
          <Route path="/signup">
            <Signup />
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
