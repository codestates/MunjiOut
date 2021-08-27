import './MainPage.css';
import Header from './Component/Header';
import Body from './Component/Body';

export default function MainPage (
    { 
        keyword, 
        searchResult, 
        handleKeywordChange, 
        handleKeywordDelete, 
        handleDropDownClick, 
        isLogin, 
        isStared, 
        isSearched 
    }) {

    return (
        <div>
            <Header 
                keyword={keyword}
                searchResult={searchResult}
                handleKeywordChange={handleKeywordChange}
                handleKeywordDelete={handleKeywordDelete}
                handleDropDownClick={handleDropDownClick}
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
