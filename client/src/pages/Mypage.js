import React, { useState } from "react";
import logo from "../MunjioutLogo.png";
import axios from "axios";
import Modal from "../components/Modal";
import styled from 'styled-components';
import { media } from '../components/utils/_media-queries';
import { fonts, colors } from '../components/utils/_var';
require("dotenv").config();

const Wrapper = styled.div`
  * {
    box-sizing: border-box;
    color: rgb(45, 45, 45);
  }
  .Logo {
    ${media.laptop`width: 250px;`} 
    ${media.tablet`width: 190px;`}
    margin-top: 30px;
    margin-bottom: 40px;
    width: 275px;
    cursor: pointer;
  }
  .Mypage {
    text-align: center;
    background-color: #f8f8f8;
    height: 100vh;
  }
  .Mypage_container {
    width: 310px;
    height: 50%;
    margin-left: auto;
    margin-right: auto;
  }
  .Mypage_input {
    ${media.mobile`width: 285px;`}
    width: 300px;
    height: 27px;
    margin-top: 2px;
    margin-bottom: 10px;
    padding: 5px;
    border-color: rgb(255, 255, 255);
    border-width: 0.2px;
  }
  .Mypage_input:focus {
    outline: none;
  }
  .Mypage_info {
    ${media.laptop`font-size: 17px;`} 
    ${media.tablet`font-size: 14px;`}
    ${media.mobile`margin-left: 8px;`}
    font-size: 19px;
    font-family: ${fonts.jua}, sans-serif;
    margin-top: 2px;
    padding-left: 6px;
    text-align: left;
  }
  .Mypage_btn {
    float: center;
    margin: 15px 15px 15px;
    ${media.largeMobile`padding: 6px 15px 4px;`}
    ${media.mobile`padding: 4px 12px 3px;`}
    padding: 8px 20px 6px;
    margin-bottom: -10px;
    background-color: gray;
    color: white;
    font-family: ${fonts.dohyun}, sans-serif;
    font-size: 18px;
    border: 2px solid gray;
    border-radius: 10px;
    transition: 0.5s ease-in-out;
  }
  .Mypage_btn:hover {
    cursor: pointer;
  }
  #edit:hover {
    background-color: ${colors.yellow};
    border: 2px solid black;
    color: black;
    border-radius: 0px;
  }
  #withdraw:hover {
    background-color: red;
    border: 2px solid black;
    color: black;
    border-radius: 0px;
  }
  .check_password,
  .check_retypepassword,
  .check_mobile,
  .check_email {
    ${media.mobile`margin-left: 8px;`}
    opacity: 0.6;
    text-align: left;
    color: red;
    margin-top: -10px;
    padding: 3px 5px 10px;
    font-size: 12px;
    font-family: ${fonts.ibm}, sans-serif;
  }
  .alert-box {
    color: red;
    font-family: ${fonts.ibm}, sans-serif;
    ${media.laptop`font-size: 14px;`}
    ${media.tablet`font-size: 13px;`}
    font-size: 15px;
    border-color: #f5c6cb;
    position: relative;
    padding: 0.75rem 1.25rem;
    margin-top: 0.7rem;
    margin-bottom: 1rem;
    border: 1px solid transparent;
    border-radius: 0.25rem;
  }
`

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
    // console.log("password :", regExp.test(e.target.value));
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
        .post(process.env.REACT_APP_API_URL + "/editUserinfo", myInfo, {
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
        process.env.REACT_APP_API_URL + "/withdrawal",
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
    <Wrapper>
      <div className="Mypage">
        <img src={logo} className="Logo" onClick={handleReplace} alt={logo}></img>
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

          <button className="Mypage_btn" id="edit" onClick={handleEditUserRequest}>
            정보수정
          </button>
          <button className="Mypage_btn" id="withdraw" onClick={handleWithdrawalRequest}>
            회원탈퇴
          </button>
          <div className="alert-box">{errorMsg}</div>
        </div>
      </div>  
    </Wrapper>
  );
}

export default Mypage;