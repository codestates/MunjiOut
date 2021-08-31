import './SearchBar.css';

export default function SearchBar (
    { 
        keyword, 
        searchResult, 
        searchResultIdx, 
        handleKeywordChange, 
        handleKeywordDelete, 
        handleDropDownClick, 
        handleDropDown 
    }) {
        
    return (
        <div>
            <div className="searchContainer">
                <input 
                    type="text"
                    className="searchBar"
                    placeholder="미세먼지 수치가 궁금한 지역을 입력하세요!" 
                    value={keyword} 
                    onChange={(e) => handleKeywordChange(e)}
                    onKeyUp={(e) => handleDropDown(e)}
                /> 
                <button 
                    className="deleteBtn" 
                    onClick={handleKeywordDelete} 
                >
                    &times;
                </button>
            </div>
            {searchResult.length === 0 ? null :
                <div className="searchList">
                    {searchResult.map((el, idx) => 
                        <li
                            className={searchResultIdx === idx ? "hoverList" : "resultList"}
                            value={el}
                            onClick={(e) => {
                                handleDropDownClick(e)
                            }}
                            key={idx}
                        >
                            {el}
                        </li>
                    )}
                </div>
            }
        </div>
    );
}
