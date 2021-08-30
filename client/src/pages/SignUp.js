import React, { useState } from "react";
import logo from "../MunjioutLogo.png";
import "./SignUp.css";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";

function Signup({
  keyword,
  searchResult,
  searchResultIdx,
  handleKeywordChange,
  handleKeywordDelete,
  handleDropDownClick,
  handleDropDown,
}) {
  const [userInfo, setUserInfo] = useState({
    username: "",
    email: "",
    password: "",
    mobile: "",
    address: "",
  });
  const [checkPassword, setCheckPassword] = useState(true);
  const [checkRetypePassword, setCheckRetypePassword] = useState(true);
  const [checkMobile, setCheckMobile] = useState(true);
  const [checkEmail, setCheckEmail] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const history = useHistory();

  const handleInputValue = (key) => (e) => {
    setUserInfo({ ...userInfo, [key]: e.target.value });
  };
  console.log(userInfo);

  const isValidEmail = (e) => {
    let regExp =
      /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    if (regExp.test(e.target.value)) {
      setCheckEmail(true);
    } else {
      setCheckEmail(false);
    }
    // console.log("email :", regExp.test(e.target.value));
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

  const handleCheckPassword = (e) => {
    if (e.target.value !== "" && e.target.value === userInfo.password) {
      setCheckRetypePassword(true);
    } else {
      setCheckRetypePassword(false);
    }
  };

  const isValidMobile = (e) => {
    let regExp = /^01(?:0|1|[6-9])(?:\d{3}|\d{4})\d{4}$/;
    if (regExp.test(e.target.value)) {
      setCheckMobile(true);
    } else {
      setCheckMobile(false);
    }
  };

  const handleSignupRequest = () => {
    if (
      userInfo.username === "" ||
      userInfo.email === "" ||
      userInfo.password === "" ||
      userInfo.mobile === "" ||
      userInfo.address === "" ||
      checkEmail !== true ||
      checkMobile !== true ||
      checkPassword !== true ||
      checkRetypePassword !== true
    ) {
      setErrorMsg("모든 항목을 바르게 작성해주세요");
    } else {
      axios
        .post("https://localhost:4000/signup", userInfo, {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        })
        .then((res) => {
          if (res.status === 201) {
            console.log(res);
            // setErrorMsg("회원가입 성공");
            history.push("/");
          }
        })
        .catch((error) => {
          setErrorMsg("이미 존재하는 이메일입니다");
        });
    }
  };

  return (
    <div className="Signup">
      <Link to="/">
        <img src={logo} className="Logo"></img>
      </Link>
      <div className="Signup_container">
        <div>
          <div className="Signup_info">이름</div>
          <input
            type="text"
            onChange={handleInputValue("username")}
            placeholder="이름을 입력해주세요"
            className="Signup_input"
          ></input>
        </div>
        <div>
          <div className="Signup_info">이메일</div>
          <input
            type="email"
            onChange={handleInputValue("email")}
            onBlur={isValidEmail}
            placeholder="이메일을 입력해주세요  ex)abcd@munjiout.com"
            className="Signup_input"
          ></input>
          <div className="check_email">
            {checkEmail ? null : "올바른 이메일 형식이 아닙니다."}
          </div>
        </div>
        <div>
          <div className="Signup_info">비밀번호</div>
          <input
            type="password"
            onChange={handleInputValue("password")}
            onBlur={isValidPassword}
            placeholder="영문/숫자 조합 8~10글자"
            className="Signup_input"
          ></input>
          <div className="check_password">
            {checkPassword ? null : "올바른 비밀번호 형식이 아닙니다."}
          </div>
        </div>
        <div>
          <div className="Signup_info">비밀번호 확인</div>
          <input
            type="password"
            onChange={handleCheckPassword}
            className="Signup_input"
          ></input>
          <div className="check_retypepassword">
            {checkRetypePassword ? null : "비밀번호가 일치하지 않습니다"}
          </div>
        </div>
        <div>
          <div className="Signup_info">전화번호</div>
          <input
            type="text"
            onChange={handleInputValue("mobile")}
            onBlur={isValidMobile}
            placeholder=" - 를 제외하고 입력해주세요"
            className="Signup_input"
          ></input>
          <div className="check_mobile">
            {checkMobile ? null : "전화번호 형식이 올바르지 않습니다"}
          </div>
        </div>
        <div>
          <div className="Signup_info">주소</div>
          <input
            placeholder="주소를 검색해주세요"
            onBlur={handleInputValue("address")}
            className="Signup_input"
          ></input>{" "}
          <div>
            <input
              type="text"
              onChange={(e) => {
                handleKeywordChange(e);
              }}
              onKeyUp={(e) => handleDropDown(e)}
              // ! 이 부분에서 어떻게 userInfo를 다뤄야할지 생각이 나질 않습니다...
              onBlur={handleInputValue("address")}
              placeholder="주소를 검색해주세요"
              value={keyword}
              className="Signup_input"
            />
            <input
              type="submit"
              onClick={handleKeywordDelete}
              value={"주소 삭제"}
            />
          </div>
          {searchResult.length === 0 ? null : (
            <div>
              {searchResult.map((el, idx) => (
                <li
                  className={
                    searchResultIdx === idx ? "hoverList" : "resultList"
                  }
                  value={el}
                  onClick={(e) => {
                    handleDropDownClick(e);
                  }}
                  key={idx}
                >
                  {el}
                </li>
              ))}
            </div>
          )}
        </div>

        <button className="Signup_btn" onClick={handleSignupRequest}>
          회원가입
        </button>
        <div className="alert-box">{errorMsg}</div>
      </div>
    </div>
  );
}

export default Signup;
