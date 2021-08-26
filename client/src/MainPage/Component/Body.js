import '../MainPage.css';
import Containers from './BodyFeature/Containers';

export default function Body ({ isLogin, isStared, isSearched }) {
    return (
        <div className="body">
            <Containers isLogin={isLogin} isStared={isStared} isSearched={isSearched} />
        </div>
    );
}
