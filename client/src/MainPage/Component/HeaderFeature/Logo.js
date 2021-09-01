import "./Logo.css";
import logo from "../../../MunjioutLogo.png";
import { Link } from "react-router-dom";

export default function Logo() {
  const handleReplace = () => {
    window.location.replace("/");
  };
  return (
    <img
      className="logoImg"
      src={logo}
      alt="MunjiOut"
      onClick={handleReplace}
    />
  );
}
