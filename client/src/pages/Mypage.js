import React, { useState } from "react";
import logo from "../MunjioutLogo.png";
import "./Mypage.css";
// import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import { debounce } from "lodash";
import axios from "axios";
import Modal from "../components/Modal";

// const debounceSomethingFunc = debounce(() => {
//   console.log("called debounceSomethingFunc");
// }, 1000);

function Mypage({ afterWithdrawal }) {
  const [checkPassword, setCheckPassword] = useState(true);
  const [checkRetypePassword, setCheckRetypePassword] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const information = JSON.parse(localStorage.getItem("userinfo"));
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [page, setPage] = useState();
  const token = localStorage.getItem("accessToken");

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
    console.log("password :", regExp.test(e.target.value));
  };
  const handleCheckPassword = (e) => {
    if (e.target.value !== "" && e.target.value === myInfo.password) {
      setCheckRetypePassword(true);
    } else {
      setCheckRetypePassword(false);
    }
  };
  const handleReplace = () => {
    window.location.replace("/");
  };

  const handleModalClose = () => {
    setIsOpen(false);
  };

  const handleEditUserRequest = () => {
    if (
      myInfo.password === "" ||
      checkPassword !== true ||
      checkRetypePassword !== true
    ) {
      setErrorMsg("변경할 비밀번호를 올바르게 입력해주세요");
    } else {
      axios
        .post("http://localhost:4000/editUserinfo", myInfo, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        })
        .then((res) => {
          if (res.status === 200) {
            setIsOpen(true);
            setPage("메인페이지로");
            setMessage("회원정보가 수정되었습니다");
          }
        })
        .catch((err) => {
          console.log(err.response);
        });
    }
  };

  const handleWithdrawalRequest = () => {
    axios
      .post(
        "http://localhost:4000/withdrawal",
        { data: null },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        if (res.status === 200) {
          setIsOpen(true);
          setMessage("회원탈퇴가 완료되었습니다");
          setPage("메인페이지로");
          afterWithdrawal();
        }
        localStorage.removeItem("userinfo");
        localStorage.removeItem("accessToken");
      });
  };

  return (
    <div className="Mypage">
      <img src={logo} className="Logo" onClick={handleReplace}></img>
      <div className="Mypage_container">
        <div>
          <div className="Mypage_info">이름</div>
          <input
            type="text"
            className="Mypage_input"
            value={information.username}
          ></input>
        </div>
        <div>
          <div className="Mypage_info">이메일</div>
          <input
            type="email"
            placeholder="이메일을 입력해주세요  ex)abcd@munjiout.com"
            className="Mypage_input"
            value={information.email}
          ></input>
          <div className="check_email"></div>
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
          <div className="Mypage_info">비밀번호</div>
          <input
            type="password"
            placeholder="영문/숫자 조합 8~10글자"
            className="Mypage_input"
            onChange={handleInputValue("password")}
            onBlur={isValidPassword}
          ></input>
          <div className="check_password">
            {checkPassword ? null : "올바른 비밀번호 형식이 아닙니다."}
          </div>
        </div>
        <div>
          <div className="Mypage_info">비밀번호 확인</div>
          <input
            type="password"
            className="Mypage_input"
            onChange={handleCheckPassword}
          ></input>
          <div className="check_retypepassword">
            {checkRetypePassword ? null : "비밀번호가 일치하지 않습니다"}
          </div>
        </div>
        <div>
          <div className="Mypage_info">전화번호</div>
          <input
            type="text"
            className="Mypage_input"
            value={information.mobile}
          ></input>
          <div className="check_mobile"></div>
        </div>

        <button className="Mypage_btn" onClick={handleEditUserRequest}>
          정보수정
        </button>
        <button className="Mypage_btn" onClick={handleWithdrawalRequest}>
          회원탈퇴
        </button>
        <div className="alert-box">{errorMsg}</div>
      </div>
    </div>
  );
}

export default Mypage;
