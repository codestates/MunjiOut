import MainPage from "./MainPage/MainPage";
import LocationName from "./Database/LocationName";
import { useEffect, useState } from "react";

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

  const [isLogin, setIsLogin] = useState(false);
  const [isStared, setIsStared] = useState(isStaredDummy);
  const [isSearched, setIsSearched] = useState(isSearchedDummy);

  function changeLoginForTest() {
    setIsLogin(!isLogin);
    console.log("🟢 isLogin", isLogin);
  }

  function showDummyDataForTest() {
    console.log("🌕 isStared", isStared);
    console.log("🌑 isSearched", isSearched);
  }

  return (
    <div>
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
      <div>
        <button onClick={changeLoginForTest}>
          test {isLogin ? "login" : "logout"}
        </button>
      </div>
      <div>
        <button onClick={showDummyDataForTest}>console.log dummy data</button>
      </div>
    </div>
  );
}

export default App;
