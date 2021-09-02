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
import Modal from "./components/Modal";
require('dotenv').config();

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [isStared, setIsStared] = useState([]);
  const [isSearched, setIsSearched] = useState([]);
  const LN = LocationName.map((el) => el.locationName);
  const [keyword, setKeyword] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [searchResultIdx, setSearchResultIdx] = useState(-1);
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [page, setPage] = useState();
  const aT = localStorage.getItem("accessToken");
  const [isLoading, setIsLoading] = useState(false);
  const [isStaredLoading, setIsStaredLoading] = useState(true);
  
  const handleReplace = () => {
    window.location.replace("/");
  };

  const handleModalClose = () => {
    setIsOpen(false);
  };

  // * Logout을 클릭하면, isLogin => false
  const handleLogout = (e) => {
    setIsStared([]);
    setIsLogin(false);
    setIsOpen(true);
    setPage("메인화면으로");
    setMessage("로그아웃 되었습니다");

    // ! Logout Request (로그인 상태 현재 미확인)
    const logoutURL = process.env.REACT_APP_API_URL + "/logout";
    const logoutConfig = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };
    axios.post(logoutURL, logoutConfig);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userinfo");
  };
  // * Loing page 에서 Login 시, isLogin을 false => true 변경
  const handleLogin = () => {
    setIsLogin(true);
  };

  // * Mypage에서 회원탈퇴 시, isLogin을 true => flase 변경
  const afterWithdrawal = () => {
    setIsLogin(false);
  };

  // * stared pic이 클릭되면, 해당 stared City Card delete
  const handleIsStaredDelete = (e) => {
    const curValue = Number(e.currentTarget.getAttribute("value"));
    setIsStared(isStared.slice(0, curValue).concat(isStared.slice(curValue + 1)));
    axios
      .post(
        process.env.REACT_APP_API_URL + "/unsetLocation",
        { location_name: isStared[curValue].stationName },
        {
          headers: {
            Authorization: `Bearer ${aT}`,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      )
      .catch(console.log);
  };

  // * searched pic이 클릭되면, 해당 searched City Card가 isStared로 포함 (UserLocations DB POST)
  // ! isStaredLoading (Alert 추가 필요)
  const handleIsSearched = (e) => {
    const curValue = Number(e.currentTarget.getAttribute("value"));
    if (isStared.length < 3 && !isStaredLoading) {
      // !
      setIsStared(isSearched.slice(curValue, curValue + 1).concat(isStared));
      setIsSearched(isSearched.filter((el, idx) => idx !== curValue));
      const setLocationURL = process.env.REACT_APP_API_URL + "/setLocation";
      const setLocationPayload = {
        location_name: isSearched[curValue].stationName,
      };
      const setLocationConfig = {
        headers: {
          Authorization: `Bearer ${aT}`,
          "Content-Type": "application/json",
        },
        withCredentials: true,
      };
      axios
        .post(setLocationURL, setLocationPayload, setLocationConfig)
        .catch(console.log);
    } else if (isStaredLoading) {
      setIsOpen(true);
      setMessage("이전 즐겨찾기 결과를 찾는 중입니다. 모든 결과를 찾은 후 즐겨찾기를 등록해주세요.");
      setPage("닫기");
    } else {
      setIsOpen(true);
      setMessage("즐겨찾기는 최대 3개까지 가능합니다");
      setPage("닫기");
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
  // ! isLoading (Alert 추가 필요)
  const makeSearchLocation = (final) => {
    const searchLocationQuery = "?query=" + final.split(" ").join("+");
    const searchURL = process.env.REACT_APP_API_URL + "/search" + searchLocationQuery;
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
    if (!isCitySearchedBefore && !isStaredAlready && !isLoading) {
      setIsLoading(true);
      axios
        .get(searchURL, searchConfig)
        .then((datas) => setIsSearched([datas.data].concat(isSearched)))
        .then(() => setIsLoading(false))
        .catch(console.log)
    } else if (isLoading) {
      setIsOpen(true);
      setMessage(
        "이전 검색 결과를 찾는 중입니다. 결과를 찾은 후 다시 검색해주세요"
      );
      setPage("닫기");
    } else {
      setIsOpen(true);
      setMessage("[선호 지역] 혹은 [검색 지역]에 이미 결과가 있습니다");
      setPage("닫기");
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

  // * MainPage 도달 시 Accesstoken이 localStrage에 있는지 확인 후, 있다면 isLogin, isStared 상태 값 변화 useEffect
  useEffect(() => {
    setIsStaredLoading(true)
    axios
      .get(process.env.REACT_APP_API_URL + "/accesstokenrequest", {
        headers: {
          Authorization: `Bearer ${aT}`,
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      .then(() => setIsLogin(true))
      .catch(console.log);
    axios
      .get(process.env.REACT_APP_API_URL + "/mainpage", {
        headers: {
          Authorization: `Bearer ${aT}`,
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      .then((findStars) => setIsStared(findStars.data.reverse()))
      .catch((err) => console.log('🔹', err))
      .finally(() => {
        setIsStaredLoading(false);
      });
  }, []);

  // useEffect(() => {
  //   axios
  //     .get(process.env.REACT_APP_API_URL + "/mainpage", {
  //       headers: {
  //         Authorization: `Bearer ${aT}`,
  //         "Content-Type": "application/json",
  //       },
  //       withCredentials: true,
  //     })
  //     .then((findStars) => {
  //       if (findStars.data.length !== 0) {
  //         setIsStared(findStars.data.reverse());
  //         console.log('🔴', findStars.data.reverse());
  //       }
  //     })
  //     .catch((err) => console.log('🟠', err));
  // }, [isSearched]);

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
              isLoading={isLoading}
              isStaredLoading={isStaredLoading}
            />
          </Route>
          <Route path="/signup">
            <Signup LN={LN} />
          </Route>
          <Route path="/login">
            <Login handleLogin={handleLogin} />
          </Route>
          <Route path="/mypage">
            <Mypage afterWithdrawal={afterWithdrawal} />
          </Route>
          <Route>
            <EmptyPage />
          </Route>
        </Switch>
        {isOpen ? (
          <Modal
            message={message}
            onClick={handleReplace}
            page={page}
            close={handleModalClose}
          />
        ) : null}
      </div>
    </BrowserRouter>
  );
}

export default App;