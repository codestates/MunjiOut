import React, { useState } from "react";
import logo from "../MunjioutLogo.png";

function Signup() {
  const [userInfo, setUserInfo] = useState({
    username: "",
    email: "",
    password: "",
    mobile: "",
    address: "",
  });
  const [checkPassword, setCheckPassword] = useState(true);

  const handleInputValue = (key) => (e) => {
    setUserInfo({ ...userInfo, [key]: e.target.value });
  };
  console.log(userInfo);

  const isValidEmail = (e) => {
    let regExp =
      /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    console.log("email :", regExp.test(e.target.value));
  };
  const isValidPassword = (e) => {
    let regExp = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,10}$/;
    console.log("password :", regExp.test(e.target.value));
  };

  const handleCheckPassword = (e) => {
    if (e.target.value !== "" && e.target.value === userInfo.password) {
      setCheckPassword(true);
    } else {
      setCheckPassword(false);
    }
  };

  return (
    <div>
      <img src={logo}></img>
      <div>
        <div>이름</div>
        <input type="text" onChange={handleInputValue("username")}></input>
      </div>
      <div>
        <div>이메일</div>
        <input
          type="email"
          onChange={handleInputValue("email")}
          onBlur={isValidEmail}
        ></input>
      </div>
      <div>
        <div>비밀번호</div>
        <input
          type="password"
          onChange={handleInputValue("password")}
          onBlur={isValidPassword}
          placeholder="영문/숫자 조합 8~10글자"
        ></input>
      </div>
      <div>
        <div>비밀번호 확인</div>
        <input type="password" onChange={handleCheckPassword}></input>
        <div>{checkPassword ? null : "비밀번호가 일치하지 않습니다"}</div>
      </div>
      <div>
        <div>전화번호</div>
        <input type="text" onChange={handleInputValue("mobile")}></input>
      </div>
      <div>
        <div>주소</div>
        <input type="text" onChange={handleInputValue("address")}></input>
      </div>
      <button>회원가입</button>
    </div>
  );
}

export default Signup;
