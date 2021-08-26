import './SearchBar.css';
import { useState } from 'react';

export default function SearchBar ({ searchBarDummy, keyword, searchResult }) {

    const [cityName, setCityName] = useState('');
    console.log('🔴', cityName);

    function cityNameChange (e) {
        setCityName(e.target.value)
    }

    return (
        <div>
            <input 
                className="searchBar"
                placeholder="시/구를 입력해 주세요!" 
                value={cityName} 
                onChange={cityNameChange}
            />
            {/* <button className="serachBtn">search</button> */}
        </div>
    );
}
