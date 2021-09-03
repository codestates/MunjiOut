import { Link } from "react-router-dom";
import styled from 'styled-components';
import { media } from '../../../components/utils/_media-queries';
import { fonts, colors } from '../../../components/utils/_var';

const Wrapper = styled.div`
  .btn {
    position: relative;
    ${media.tablet`font-size: 13px;`}
    font-size: 14px;
    margin-top: -10px;
    margin-right: 10px;
    padding: 6px 8px 6px;
    width: 70px;
    height: 35px;
    border: 2px solid ${colors.darkGray};
    border-radius: 5px;
    display: inline;
    color: ${colors.darkGray};
    font-family: ${fonts.dohyun};
    font-weight: bold;
    letter-spacing: 1.5px;
    background-color: white;
    transition: 0.5s ease-in-out;
  }
  #logout:hover,
  #login:hover {
    background-color: ${colors.darkGray};
    color: white;
    cursor: pointer;
  }
  #signup:hover,
  #mypage:hover {
    background-color: ${colors.yellow};
    cursor: pointer;
  }
`
export default function Button({ isLogin, handleLogout }) {
  return (
    <Wrapper>
      <div>
        {!isLogin ? (
          <Link to="/login" style={{ textDecoration: "none" }}>
            <button className="btn login" id="login">Login</button>
          </Link>
        ) : (
          <button className="btn logout" id="logout" onClick={handleLogout}>
            Logout
          </button>
        )}
        {!isLogin ? (
          <Link to="/signup" style={{ textDecoration: "none" }}>
            <button className="btn signup" id="signup">Signup</button>
          </Link>
        ) : (
          <Link to="/mypage" style={{ textDecoration: "none" }}>
            <button className="btn mypage" id="mypage">MyPage</button>
          </Link>
        )}
      </div> 
    </Wrapper>
  );
}
