import LocationName from "./Database/LocationName";
import MainPage from "./MainPage/MainPage";
import Signup from "./pages/SignUp";
import Login from "./pages/Login";
import Mypage from "./pages/Mypage";
import EmptyPage from "./pages/EmptyPage";
import { useEffect, useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { getRegExp } from "korean-regexp";
import axios from "axios";

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [isStared, setIsStared] = useState([]);
  const [isSearched, setIsSearched] = useState([]);
  const LN = LocationName.map((el) => el.locationName);
  const [keyword, setKeyword] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [searchResultIdx, setSearchResultIdx] = useState(-1);
  const [accessToken, setAccessToken] = useState(null);
  const [userinfo, setUserinfo] = useState({
    id: "",
    username: "",
    email: "",
    mobile: "",
    address: "",
  });
  // ! Loaidng #1
  // const [isLoading, setIsLoading] = useState([]);

  const getAccessToken = (token) => {
    setAccessToken(token);
  };
  console.log("Token :", accessToken);

  // * Logout을 클릭하면, isLogin => false
  const handleLogout = (e) => {
    setIsLogin(false);
    alert("로그아웃 되었습니다.");

    // ! Logout Request (로그인 상태 현재 미확인)
    const logoutURL = "https://localhost:4000/logout";
    const logoutConfig = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };
    axios.post(logoutURL, logoutConfig);
  };

  const handleLogin = () => {
    setIsLogin(true);
  };

  // * isLogin이 false로 변경되면, isStared rerender 되는 useEffect
  useEffect(() => {
    setIsStared([]);
  }, [isLogin === false]);

  // * stared pic이 클릭되면, 해당 stared City Card delete
  // ! query
  const handleIsStaredDelete = (e) => {
    const curValue = Number(e.currentTarget.getAttribute("value"));
    setIsStared(
      isStared.slice(0, curValue).concat(isStared.slice(curValue + 1))
    );
  };

  // * searched pic이 클릭되면, 해당 searched City Card가 isStared로 포함
  // ! query
  const handleIsSearched = (e) => {
    const curValue = Number(e.currentTarget.getAttribute("value"));
    console.log("🔴", isSearched[curValue]);
    if (isStared.length < 3) {
      setIsStared(isSearched.slice(curValue, curValue + 1).concat(isStared));
      setIsSearched(isSearched.filter((el, idx) => idx !== curValue));

      console.log("🟢", accessToken);
      const setLocationURL = "https://localhost:4000/setLocation";
      const setLocationPayload = {
        location_name: isSearched[curValue].stationName,
      };
      const setLocationConfig = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        withCredentials: true,
      };
      console.log("🟠", setLocationPayload, setLocationConfig);

      axios
        .post(setLocationURL, setLocationPayload, setLocationConfig)
        .then((res) => console.log(res));
    } else {
      alert("즐겨찾기는 최대 3개까지 가능합니다.");
    }
  };

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
    if (keyword === searchResult[0]) setSearchResult([keyword]);
    if (searchResult.length === 0) setSearchResultIdx(0);
  }, [keyword, searchResult]);

  // * SearchBar에 단어를 입력하면, keyword가 변경되는 event handler
  const handleKeywordChange = (e) => setKeyword(e.target.value);

  // * kewyword를 초기화하는 event handler
  const handleKeywordDelete = () => setKeyword("");

  // * makeSearchLocation Query를 Request하는 함수 (DropDownClick, DropDown에서 공용 사용)
  const makeSearchLocation = async (final) => {
    // ! Loaidng #2
    // setIsLoading(isLoading.concat(true));
    const searchLocationQuery = "?query=" + final.split(" ").join("+");
    const searchURL = "https://localhost:4000/search" + searchLocationQuery;
    const searchConfig = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };
    const isCitySearchedBefore =
      isSearched
        .map((el) => {
          return el.stationName === final;
        })
        .find((el) => el === true) || false;
    const isStaredAlready =
      isStared
        .map((el) => {
          return el.stationName === final;
        })
        .find((el) => el === true) || false;

    if (!isCitySearchedBefore && !isStaredAlready) {
      await axios.get(searchURL, searchConfig).then((datas) => {
        setIsSearched([datas.data].concat(isSearched));
        // ! Loaidng #3
        // setIsLoading(isLoading.map((el, idx) => idx === isSearched.length - 1 ? true : el))
      });
    } else {
      alert("[선호 지역] 혹은 [검색 지역]에 이미 결과가 있습니다.");
    }
  };

  // * DropDown에 있는 li 클릭 시 해당 내용으로 keyword update되는 event handler
  const handleDropDownClick = (e) => {
    const finalKeyword = e.target.innerText;
    makeSearchLocation(finalKeyword);
    setKeyword("");
  };

  // * DropDonw에서 방향키, Enter 클릭 시 작용
  const handleDropDown = async (e) => {
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
      const finalKeyword = searchResult[searchResultIdx];
      makeSearchLocation(finalKeyword);
      setKeyword("");
    }
  };

  const getUserinfo = () => {
    axios
      .get("https://localhost:4000/userinfo", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      .then((res) => {
        console.log("userinfo :", res);
      })
      .catch((err) => {
        console.log("userinfo error :", err.response);
      });
  };

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
              handleLogout={handleLogout}
              handleIsStaredDelete={handleIsStaredDelete}
              handleIsSearched={handleIsSearched}
              getUserinfo={getUserinfo}
            />
          </Route>
          <Route path="/signup">
            <Signup LN={LN} />
          </Route>
          <Route path="/login">
            <Login handleLogin={handleLogin} getAccessToken={getAccessToken} />
          </Route>
          <Route path="/mypage">
            <Mypage />
          </Route>
          <Route>
            <EmptyPage />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
