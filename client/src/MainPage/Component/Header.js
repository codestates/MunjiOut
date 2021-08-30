import './Header.css';
import Logo from './HeaderFeature/Logo';
import Button from './HeaderFeature/Button';
import SearchBar from './HeaderFeature/SearchBar';

export default function Header (
    { 
        keyword, 
        searchResult, 
        searchResultIdx, 
        handleKeywordChange, 
        handleKeywordDelete,
        handleDropDownClick, 
        handleDropDown, 
        isLogin,
        handleLogout
    }) {
        
    return (
        <div className="header">
            <Logo />
            <SearchBar 
                keyword={keyword}
                searchResult={searchResult}
                searchResultIdx={searchResultIdx}
                handleKeywordChange={handleKeywordChange}
                handleKeywordDelete={handleKeywordDelete}
                handleDropDownClick={handleDropDownClick}
                handleDropDown={handleDropDown}
            />
            <Button isLogin={isLogin} handleLogout={handleLogout} />
        </div>
    );
}
