import React, { useState } from "react";
import logo from "../MunjioutLogo.png";
import { Link, Redirect, useHistory } from "react-router-dom";
import "./Login.css";
import axios from "axios";
import Modal from "../components/Modal";

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
        .post("http://localhost:4000/login", loginInfo, {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        })
        .then((res) => {
          localStorage.setItem("accessToken", res.data.accessToken);
          handleLogin();
          setIsOpen(true);
          setPage("메인화면으로");
          setMessage("환영합니다");
          return res.data.accessToken;
        })
        .then((token) => {
          axios
            .get("http://localhost:4000/userinfo", {
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
  );
}

export default Login;
