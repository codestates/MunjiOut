import React, { useState } from "react";
import logo from "../MunjioutLogo.png";
import "./SignUp.css";
import axios from "axios";
import { Link } from 'react-router-dom';

function Mypage() {
  return (
    <div className="Mypage">
      <Link to='/'>
        <img src={logo}></img>
      </Link>
      <div className="Mypage_container">
        <div>
          <div>이름</div>
          <input type="text" placeholder="이름을 입력해주세요"></input>
        </div>
        <div>
          <div>이메일</div>
          <input
            type="email"
            placeholder="이메일을 입력해주세요  ex)abcd@munjiout.com"
          ></input>
          <div className="check_email"></div>
        </div>
        <div>
          <div className="info">비밀번호</div>
          <input type="password" placeholder="영문/숫자 조합 8~10글자"></input>
          <div className="check_password"></div>
        </div>
        <div>
          <div className="info">비밀번호 확인</div>
          <input type="password"></input>
          <div className="check_retypepassword"></div>
        </div>
        <div>
          <div className="info">전화번호</div>
          <input type="text" placeholder=" - 를 제외하고 입력해주세요"></input>
          <div className="check_mobile"></div>
        </div>
        <div>
          <div className="info">주소</div>
          <input placeholder="주소를 검색해주세요"></input>
        </div>
        <button className="btn_SU">정보수정</button>
      </div>
    </div>
  );
}

export default Mypage;
