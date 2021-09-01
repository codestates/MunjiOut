import React, { useState, useEffect } from "react";
import logo from "../MunjioutLogo.png";
import "./SignUp.css";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import { getRegExp } from "korean-regexp";
import Modal from "../components/Modal";

function Signup({ LN }) {
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
  const [addressResult, setAddressResult] = useState([]);
  const [addressIdx, setAddressIdx] = useState(-1);
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [page, setPage] = useState();

  const handleInputValue = (key) => (e) => {
    setUserInfo({ ...userInfo, [key]: e.target.value });
  };
  const handleInputAddress = (e) => {
    // setUserInfo({ ...userInfo, ["address"]: addressResult[addressIdx] });
    setUserInfo({ ...userInfo, ["address"]: e.target.value });
  };
  const deleteInputAddress = () => {
    setUserInfo({ ...userInfo, ["address"]: "" });
  };

  // userInfo.address 값이 바뀔 때 마다 새로운 AddressResult 생성 useEffect
  useEffect(() => {
    if (!userInfo.address) {
      setAddressResult([]);
      setAddressIdx(-1);
    } else {
      setAddressResult(
        LN.filter((el) => getRegExp(userInfo.address).test(el)).filter(
          (el, idx) => (idx < 5 ? el : null)
        )
      );
    }
  }, [userInfo.address]);

  // userInfo.address를 선택했을 시 상태값 초기화 useEffect
  useEffect(() => {
    if (userInfo.address === addressResult[0]) setAddressResult([]);
    if (addressResult.length === 0) setAddressIdx(-1);
  }, [userInfo.address, addressResult]);

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

  const handleReplace = () => {
    window.location.replace("/login");
  };

  const handleModalClose = () => {
    setIsOpen(false);
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
        .post("http://localhost:4000/signup", userInfo, {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        })
        .then((res) => {
          if (res.status === 201) {
            setIsOpen(true);
            setPage("로그인페이지로");
            setMessage("회원가입이 완료되었습니다");
          }
        })
        .catch((error) => {
          console.log(error.response);
          if (error.response.data.message === "conflict: email") {
            setErrorMsg("이미 가입된 이메일입니다");
          }
          if (error.response.data.message === "conflict: mobile") {
            setErrorMsg("이미 가입된 전화번호입니다");
          }
          if (error.response.data.message === "conflict: email & mobile") {
            setErrorMsg("이미 가입된 이메일 및 전화번호입니다");
          }
        });
    }
  };

  // * AddressDropDown에 있는 li 클릭 시, userInfo.address 해당 innerText로 변경
  const handleAddressDropDownClick = (e) => {
    setUserInfo({ ...userInfo, ["address"]: e.target.innerText });
  };

  // * AddressDropDonw에서 방향키, Enter 클릭 시 작용
  const handleAddressDropDown = (e) => {
    if (e.key === "ArrowDown" && addressIdx < addressResult.length - 1) {
      setAddressIdx(addressIdx + 1);
    } else if (
      e.key === "ArrowUp" &&
      -1 < addressIdx &&
      addressIdx <= addressResult.length - 1
    ) {
      setAddressIdx(addressIdx - 1);
    }
    if (e.key === "Enter" && addressResult.length !== 0) {
      setUserInfo({ ...userInfo, ["address"]: addressResult[addressIdx] });
    }
  };

  return (
    <div className="Signup">
      <img src={logo} className="Logo" onClick={handleReplace}></img>
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
        {isOpen ? (
          <Modal
            message={message}
            onClick={handleReplace}
            page={page}
            close={handleModalClose}
          />
        ) : null}
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
          {/* <input
            placeholder="주소를 검색해주세요"
            onBlur={handleInputValue("address")}
            className="Signup_input"
          ></input>{" "} */}
          <div>
            <input
              type="text"
              onChange={handleInputAddress}
              onKeyUp={handleAddressDropDown}
              placeholder="주소를 검색해주세요"
              value={userInfo.address}
              className="Signup_input"
            />
            <input
              type="submit"
              onClick={deleteInputAddress}
              value={"주소 삭제"}
            />
          </div>
          {addressResult.length === 0 ? null : (
            <div>
              {addressResult.map((el, idx) => (
                <li
                  className={addressIdx === idx ? "hoverList" : "resultList"}
                  value={el}
                  onClick={handleAddressDropDownClick}
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
