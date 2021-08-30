import React, { useState } from "react";
import "./Modal.css";

function Modal() {
  const [isOpen, setIsOpen] = useState(true);
  const [message, setMessage] = useState("test");
  const handleOpenModal = () => {
    setIsOpen(!isOpen);
  };
  console.log(isOpen);
  return (
    // <div className="Modal_container">
    <>
      {/* <button className="Modal_btn" onClick={handleOpenModal}>
        {isOpen ? "opened" : "closed"}
      </button> */}
      {isOpen ? (
        <div className="Modal_backdrop">
          <div className="Modal_view" role="dialog">
            <p></p>
            <div>{message}</div>
            <button onClick={handleOpenModal}>메인페이지로</button>
          </div>
        </div>
      ) : null}
    </>
    // </div>
  );
}

export default Modal;
