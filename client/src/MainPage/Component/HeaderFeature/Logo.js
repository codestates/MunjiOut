import logo from "../../../MunjioutLogo.png";
import styled from 'styled-components';

const Wrapper = styled.div`
  .logoImg {
    margin-left: 10px;
    margin-top: 80px;
    width: 120px;
    /* height: 35px; */
    transform: translateY(5%);
  }
  .logoImg:hover {
    cursor: pointer;
  }
`
export default function Logo() {
  const handleReplace = () => {
    window.location.replace("/");
  };
  return (
    <Wrapper>
      <img
        className="logoImg"
        src={logo}
        alt="MunjiOut"
        onClick={handleReplace}
      />
    </Wrapper>
  );
}