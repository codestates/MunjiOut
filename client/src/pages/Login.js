import React, { useState } from "react";
import logo from "../MunjioutLogo.png";
import { Link, Redirect, useHistory } from "react-router-dom";
// import "./Login.css";
import axios from "axios";
import Modal from "../components/Modal";
import styled from 'styled-components';
import { media } from '../components/utils/_media-queries';
import { fonts, colors } from '../components/utils/_var';
require("dotenv").config();

const Wrapper = styled.div`
  * {
    box-sizing: border-box;
    color: ${colors.darkGray};
  }
  .Logo {
    ${media.huge`margin-top: 50px; margin-bottom: 50px; width: 275px;`}
    ${media.laptop`margin-top: 50px; margin-bottom: 50px; width: 250px;`} 
    ${media.tablet`margin-top: 60px; margin-bottom: 60px; width: 220px;`}
    cursor: pointer;
  }
  .Login_info {
    ${media.huge`font-size: 20px;`}
    ${media.laptop`font-size: 18px;`} 
    ${media.tablet`margin-top: 15px;`}
    font-family: ${fonts.jua}, sans-serif;
    text-align: left;
    padding-left: 6px;
  }
  .Login {
    text-align: center;
    background-color: rgb(235, 235, 235);
    height: 100vh;
  }
  .Login_container {
    /* border: 1px black solid; */
    width: 310px;
    /* height: 100vh; */
    margin-left: auto;
    margin-right: auto;
  }
  .Login_btn {
    background-color: ${colors.yellow};
    font-family: ${fonts.dohyun}, sans-serif;
    font-size: 1rem;
    width: 240px;
    height: 40px;
    letter-spacing: 3px;
    border-radius: 20px;
    margin-top: 12px;
    transition: 0.5s ease-in-out;
  }
  .Login_btn:hover {
    /* background-color: #ffc83c; */
    background-color: gray;
    width: 300px;
    border: none;
    border-radius: 0;
    color: white;
    cursor: pointer;
  }
  .Login_input {
    width: 300px;
    height: 25px;
    margin-bottom: 20px;
    padding: 5px;
    border-color: rgb(255, 255, 255);
    border-width: 0.2px;
  }
  .Login_input:focus {
    outline: none;
  }
  .alert-box {
    /* background-color: #f8d7da; */
    color: red;
    font-family: ${fonts.ibm}, sans-serif;
    font-weight: 500;
    ${media.huge`font-size: 16px;`}
    ${media.laptop`font-size: 14px;`}
    border-color: #f5c6cb;
    position: relative;
    padding: 0.75rem 1.25rem;
    margin-bottom: 1rem;
    border: 1px solid transparent;
    border-radius: 0.25rem;
  }
`

function Login({ handleLogin }) {
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [page, setPage] = useState();
  const aT = localStorage.getItem("accessToken");

  const handleInputValue = (key) => (e) => {
    setLoginInfo({ ...loginInfo, [key]: e.target.value });
  };
  const handleReplace = () => {
    window.location.replace("/");
  };

  const handleModalClose = () => {
    setIsOpen(false);
  };

  const handleLoginRequest = () => {
    if ((loginInfo.email === "", loginInfo.password === "")) {
      setErrorMsg("이메일과 비밀번호를 입력해주세요");
    } else {
      axios
        // 
        .post(process.env.REACT_APP_API_URL + "/login", loginInfo, {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        })
        .then((res) => {
          localStorage.setItem("accessToken", res.data.accessToken);
          handleLogin();
          setIsOpen(true);
          setPage("메인화면으로");
          setMessage("환영합니다!");
          return res.data.accessToken;
        })
        .then((token) => {
          axios
            .get(process.env.REACT_APP_API_URL +"/userinfo", {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
              withCredentials: true,
            })
            .then((res) => {
              console.log("userinfo :", res.data.data);
              // setUserinfo(res.data.data);
              localStorage.setItem("userinfo", JSON.stringify(res.data.data));
            })
            .catch((err) => {
              console.log("userinfo error :", err.response);
            });
        })
        .catch((err) => {
          console.log(err.response);
          if (err.response.status === 404) {
            setErrorMsg("등록되지 않은 유저입니다");
          } else if (err.response.status === 400) {
            setErrorMsg("비밀번호를 확인해주세요");
          }
        });
    }
  };

  const enter = (e) => {
    if (e.key === "Enter" && e.target.value !== "") {
      handleLoginRequest();
    }
  };

  return (
    <Wrapper>
      <div className="Login">
        <img src={logo} className="Logo" onClick={handleReplace}></img>
        <div className="Login_container">
          <div>
            <div className="Login_info">이메일</div>
            <input
              className="Login_input"
              onChange={handleInputValue("email")}
              onKeyPress={(e) => {
                enter(e);
              }}
            ></input>
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
            <div className="Login_info">비밀번호</div>
            <input
              className="Login_input"
              type="password"
              onChange={handleInputValue("password")}
              onKeyPress={(e) => {
                enter(e);
              }}
            ></input>
          </div>
          <button className="Login_btn" onClick={handleLoginRequest}>
            로그인
          </button>
          <div className="alert-box">{errorMsg}</div>
        </div>
      </div>
    </Wrapper>
  );
}

export default Login;