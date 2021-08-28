import './Logo.css';
import logo from "../../../MunjioutLogo.png";
import { Link } from 'react-router-dom';

export default function Logo () {
    return (
        <Link to="/">
            <img className="logoImg" src={logo} alt="MunjiOut" />
        </Link>
    );
}
