import React from "react";
import logo from "../MunjioutLogo.png";
import { Link } from "react-router-dom";
import "./Login.css";

function Login() {
  return (
    <div className="Login">
      <Link to="/">
        <img src={logo} className="Logo"></img>
      </Link>
      <div className="Login_container">
        <div>
          <div className="Login_info">이메일</div>
          <input className="Login_input"></input>
        </div>
        <div>
          <div className="Login_info">비밀번호</div>
          <input className="Login_input"></input>
        </div>
        <button className="Login_btn">로그인</button>
      </div>
    </div>
  );
}

export default Login;
