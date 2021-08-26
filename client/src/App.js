// import logo from './logo.svg';
// import './App.css';
import MainPage from './MainPage/MainPage';
import { useState } from 'react';

function App() {

  // SearchBar test Start
  const searchBarDummy = [
    { city: 'Seoul', time: '17:00', pm10value: 110 },
    { city: 'Seoul2', time: '16:00', pm10value: 85 },
    { city: 'Seoul3', time: '18:00', pm10value: 120 },
    { city: 'Seoul4', time: '16:00', pm10value: 35 },
    { city: 'Seoul5', time: '17:00', pm10value: null },
    { city: 'Jeju', time: '16:00', pm10value: 60 },
    { city: 'Busan', time: '16:30', pm10value: 40 },
  ]
  const isStaredDummy = [
    { id: 1, city: 'Seoul', time: '17:00', pm10value: 110 }, 
    { id: 2, city: 'Jeju', time: '16:00', pm10value: 60 }
  ]
  const isSearchedDummy = [
    { id: 1, city: 'Busan', time: '16:30', pm10value: 40 }
  ]

  const [keyword, setKeyword] = useState('');
  const [searchResult, setSearchResult] = useState(new Array(0));
  // SearchBar test End

  const [isLogin, setIsLogin] = useState(false);
  const [isStared, setIsStared] = useState(isStaredDummy);
  const [isSearched, setIsSearched] = useState(isSearchedDummy);
  
  function changeLoginForTest () {
    setIsLogin(!isLogin);
    console.log('🟢 isLogin', isLogin);
  }

  function showDummyDataForTest () {
    console.log('🌕 isStared', isStared);
    console.log('🌑 isSearched', isSearched);
  }


  return (
    <div>
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      <MainPage 
        searchBarDummy={searchBarDummy}
        keyword={keyword}
        searchResult={searchResult}
        isLogin={isLogin}
        isStared={isStared}
        isSearched={isSearched}
      />
      <div>
        <button onClick={changeLoginForTest}>test {isLogin ? 'login' : 'logout'}</button>
      </div>
      <div>
        <button onClick={showDummyDataForTest}>console.log dummy data</button>
      </div>
    </div>
  );
}

export default App;
