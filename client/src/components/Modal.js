import React, { useState } from "react";
import "./Modal.css";

function Modal({ message, onClick, page, close }) {
  return (
    <>
      <div className="Modal_backdrop">
        <div className="Modal_view" role="dialog">
          <div className="Modal_message">{message}</div>
          {page !== "닫기" ? (
            <>
              <button className="Modal_btn_left" onClick={onClick}>
                {page}
              </button>
              <button className="Modal_btn_right" onClick={close}>
                &times;
              </button>
            </>
          ) : (
            <button className="Modal_btn_center" onClick={close}>
              닫기
            </button>
          )}
        </div>
      </div>
    </>
  );
}

export default Modal;
