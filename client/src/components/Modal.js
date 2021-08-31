import React, { useState } from "react";
import "./Modal.css";

function Modal({ message, onClick }) {
  return (
    <>
      <div className="Modal_backdrop">
        <div className="Modal_view" role="dialog">
          <div className="Modal_message">{message}</div>
          <button className="Modal_btn" onClick={onClick}>
            메인페이지로
          </button>
        </div>
      </div>
    </>
  );
}

export default Modal;
