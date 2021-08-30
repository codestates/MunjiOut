import '../MainPage.css';
import Containers from './BodyFeature/Containers';

export default function Body (
    { 
        isLogin, 
        isStared, 
        isSearched, 
        handleIsStaredDelete, 
        handleIsSearched 
    }) {

    return (
        <div className="body">
            <Containers 
                isLogin={isLogin} 
                isStared={isStared} 
                isSearched={isSearched} 
                handleIsStaredDelete={handleIsStaredDelete} 
                handleIsSearched={handleIsSearched} 
            />
        </div>
    );
}
