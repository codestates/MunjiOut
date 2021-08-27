import './Header.css';
import Logo from './HeaderFeature/Logo';
import Button from './HeaderFeature/Button';
import SearchBar from './HeaderFeature/SearchBar';

export default function Header ({ keyword, searchResult, handleKeywordChange, handleKeywordDelete, handleDropDownClick, isLogin }) {
    return (
        <div className="header">
            <Logo />
            <SearchBar 
                keyword={keyword}
                searchResult={searchResult}
                handleKeywordChange={handleKeywordChange}
                handleKeywordDelete={handleKeywordDelete}
                handleDropDownClick={handleDropDownClick}
            />
            <Button isLogin={isLogin} />
        </div>
    );
}
