import './MainPage.css';
import Header from './Component/Header';
import Body from './Component/Body';

export default function MainPage (
    {
        keyword, 
        searchResult, 
        searchResultIdx,
        handleKeywordChange, 
        handleKeywordDelete, 
        handleDropDownClick,
        handleDropDown,
        isLogin, 
        isStared, 
        isSearched 
    }) {

    return (
        <div className="mainPage">
            <Header 
                keyword={keyword}
                searchResult={searchResult}
                searchResultIdx={searchResultIdx}
                handleKeywordChange={handleKeywordChange}
                handleKeywordDelete={handleKeywordDelete}
                handleDropDownClick={handleDropDownClick}
                handleDropDown={handleDropDown}
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
