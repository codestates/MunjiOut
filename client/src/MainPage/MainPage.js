import './MainPage.css';
import Header from './Component/Header';
import Body from './Component/Body';

export default function MainPage ({ searchBarDummy, keyword, searchResult, isLogin, isStared, isSearched }) {

    return (
        <div>
            <Header 
                searchBarDummy={searchBarDummy}
                keyword={keyword}
                searchResult={searchResult}
                isLogin={isLogin} 
            />
            <Body 
                isLogin={isLogin} 
                isStared={isStared} 
                isSearched={isSearched} 
            />
        </div>
    );
}
