import './Header.css';
import Logo from './HeaderFeature/Logo';
import Button from './HeaderFeature/Button';
import SearchBar from './HeaderFeature/SearchBar';

export default function Header ({ isLogin }) {
    return (
        <div className="header">
            <Logo />
            <SearchBar />
            <Button isLogin={isLogin} />
        </div>
    );
}
