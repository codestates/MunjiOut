import './Logo.css';
import logo from "../../../MunjioutLogo.png";

export default function Logo () {
    return (
        <img className="logoImg" src={logo} alt="MunjiOut" />
    );
}
