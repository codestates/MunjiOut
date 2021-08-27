import React from "react";
import logo from "../MunjioutLogo.png";
import { Link } from 'react-router-dom';

function Login() {
  return (
    <div className="Login">
      <Link to="/">
        <img src={logo}></img>
      </Link>
      <div className="login_container">
        <div>
          <div>이메일</div>
          <input></input>
        </div>
        <div>
          <div>비밀번호</div>
          <input></input>
        </div>
        <button>로그인</button>
      </div>
    </div>
  );
}

export default Login;
