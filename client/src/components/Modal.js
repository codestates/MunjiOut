import React from "react";
import styled from 'styled-components';
import { media } from '../components/utils/_media-queries';
import { fonts, colors } from '../components/utils/_var';

const Wrapper = styled.div`
  * {
    color: ${colors.darkGray};
  }
  .Modal_backdrop {
    position: fixed;
    z-index: 999;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.4);
    display: grid;
    place-items: center;
    height: 100vh;
  }
  .Modal_btn_right {
    position: absolute;
    left: 94.5%;
    top: 3%;
    transform: translate(-50%);
    ${media.huge`font-size: 25px;`}
    ${media.tablet`font-size: 20px;`}
    font-weight: bold;
    border: none;
    background-color: white;
    font-family: ${fonts.dohyun}, sans-serif;
  }
  .Modal_btn_left {
    position: absolute;
    left: 50%;
    top: 67%;
    padding: 4px 12px;
    transform: translate(-50%);
    ${media.huge`font-size: 14px;`}
    ${media.tablet`font-size: 12px;`}
    background-color: ${colors.yellow};
    border-radius: 8px;
    font-family: ${fonts.dohyun}, sans-serif;
  }
  .Modal_btn_center {
    position: absolute;
    left: 50%;
    top: 67%;
    padding: 4px 12px;
    transform: translate(-50%);
    ${media.huge`font-size: 14px;`}
    ${media.tablet`font-size: 12px;`}
    background-color: ${colors.yellow};
    border-radius: 8px;
    font-family: ${fonts.dohyun}, sans-serif;
  }
  .Modal_btn_right,
  .Modal_btn_center,
  .Modal_btn_left:hover {
    cursor: pointer;
  }
  .Modal_view {
    box-sizing: border-box;
    /* width: 40vh; */
    /* height: 20vh; */
    ${media.huge`min-width: 300px; min-height: 150px;`}
    ${media.tablet`min-width: 250px; min-height: 130px;`}
    background-color: rgb(255, 255, 255);
    position: relative;
    text-align: center;
    font-size: 20px;
    font-family: ${fonts.jua}, sans-serif;
  }
  .Modal_message {
    position: absolute;
    ${media.huge`font-size: 20px;`}
    ${media.tablet`font-size: 17px;`}
    left: 50%;
    top: 45%;
    transform: translate(-50%, -50%);
    width: 100%;
  }
`

function Modal({ message, onClick, page, close }) {
  return (
    <Wrapper>
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
    </Wrapper>
  );
}

export default Modal;