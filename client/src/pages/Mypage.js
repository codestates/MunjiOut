import React, { useState } from "react";
import logo from "../MunjioutLogo.png";
import "./Mypage.css";
// import axios from "axios";
import { Link } from "react-router-dom";

function Mypage({ userinfo }) {

  const { username, email, mobile } = userinfo;
  console.log('🟡', username, email, mobile);
  const [checkPassword, setCheckPassword] = useState(true);
  const [myInfo, setMyInfo] = useState({
    password: "",
  });
  // console.log("userinfo :", userinfo);
  const handleInputValue = (key) => (e) => {
    setMyInfo({ ...myInfo, [key]: e.target.value });
  };
  const isValidPassword = (e) => {
    let regExp = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,10}$/;
    if (regExp.test(e.target.value)) {
      setCheckPassword(true);
    } else {
      setCheckPassword(false);
    }
    // console.log("password :", regExp.test(e.target.value));
  };

  const handleEditUserRequest = () => {};
  return (
    <div className="Mypage">
      <Link to="/">
        <img src={logo} className="Logo"></img>
      </Link>
      <div className="Mypage_container">
        <div>
          <div className="Mypage_info">이름</div>
          <input
            type="text"
            className="Mypage_input"
            placeholder={userinfo.username}
          ></input>
        </div>
        <div>
          <div className="Mypage_info">이메일</div>
          <input
            type="email"
            placeholder="이메일을 입력해주세요  ex)abcd@munjiout.com"
            className="Mypage_input"
            value={userinfo.email}
          ></input>
          <div className="check_email"></div>
        </div>
        <div>
          <div className="Mypage_info">비밀번호</div>
          <input
            type="password"
            placeholder="영문/숫자 조합 8~10글자"
            className="Mypage_input"
            onChange={handleInputValue("password")}
            onBlur={isValidPassword}
          ></input>
          <div className="check_password"></div>
        </div>
        <div>
          <div className="Mypage_info">비밀번호 확인</div>
          <input type="password" className="Mypage_input"></input>
          <div className="check_retypepassword"></div>
        </div>
        <div>
          <div className="Mypage_info">전화번호</div>
          <input
            type="text"
            className="Mypage_input"
            value={userinfo.mobile}
          ></input>
          <div className="check_mobile"></div>
        </div>
        {/* <div> */}
        {/* <div className="Mypage_info">주소</div> */}
        {/* <input placeholder="주소를 검색해주세요"></input> */}
        {/* </div> */}
        <button className="Mypage_btn">정보수정</button>
        <button className="Mypage_btn">회원탈퇴</button>
      </div>
    </div>
  );
}

export default Mypage;