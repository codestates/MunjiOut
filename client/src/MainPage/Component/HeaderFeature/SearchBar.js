import './SearchBar.css';
import { useState } from 'react';

export default function SearchBar ({ keyword, searchResult, handleKeywordChange, handleDropDownClick, handleKeywordDelete }) {

    return (
        <div>
            <input 
                className="searchBar"
                placeholder="시/구를 입력해 주세요!" 
                value={keyword} 
                onChange={(e) => handleKeywordChange(e)}
            /> 
            {keyword === "" ? null : (searchResult.map((el, idx) => {
                <li
                    className="dropDownList"
                    onClick={(e) => handleDropDownClick(e)}
                    key={idx + 1}
                >
                    {el}
                </li>
            }))}
            <span className="deleteBtn" onClick={handleKeywordDelete}>&times;</span>
        </div>
    );
}
